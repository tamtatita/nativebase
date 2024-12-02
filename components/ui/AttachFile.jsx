import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";
import * as DocumentPicker from "expo-document-picker";
import { FlashList } from "@shopify/flash-list";
import PropTypes from "prop-types";
import {
  deleteFileService,
  getItemsService,
  uploadFileToDocLibService,
} from "../../utils/services";
import lists from "./../../utils/lists";
import { useEffect } from "react";
import { removeGuidFromFileName } from "../../utils/helpers";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const propTypes = {
  refId: PropTypes.number,
  dataSource: PropTypes.string,
};
const SERVERRELATIVEURL = "/DocumentStore";
const AttachFile = ({ refId = 1, dataSource = "DocumentStore" }) => {
  const [files, setFiles] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [selectedDeleteFile, setSelectedDeleteFile] = useState(null);
  const [loadingState, setLoadingState] = useState("");

  const showModal = (selectedDeleteFile) => {
    setSelectedDeleteFile(selectedDeleteFile);
    setIsShowDeleteModal(true);
  };
  const hideModal = () => {
    setSelectedDeleteFile(null);
    setIsShowDeleteModal(false);
  };

  const pickFiles = async () => {
    try {
      setLoadingState("upload");

      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (result.canceled) {
        setLoadingState("");
        console.log("User canceled document selection");
        return;
      }

      const file = result.assets[0]; // File thông tin từ DocumentPicker

      const audioFile = {
        name: `${uuid.v4()}_${file.name}`,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      // const sendFile = base64toFile(fileContent, "image/jpeg", "image.jpg");
      const newFiles = await uploadFileToDocLibService(
        SERVERRELATIVEURL,
        audioFile.name,
        refId,
        dataSource,
        audioFile
      );
      await handleGetFiles();
    } catch (err) {
      console.log("Error picking files: ", err);
    } finally {
      setLoadingState("");
    }
  };

  const handleDeleteFile = async () => {
    try {
      setLoadingState(`delete-${selectedDeleteFile.Id}`);
      await deleteFileService(selectedDeleteFile.ServerRelativeUrl);
      await handleGetFiles();
    } catch (err) {
      console.log("Error deleting file: ", err);
    } finally {
      setLoadingState("");
      setIsShowDeleteModal(false);
    }
  };

  const handleGetFiles = async () => {
    try {
      setLoadingState("getFiles");
      const files = await getItemsService(lists.StoreRecords, {
        filter: `RefID eq ${refId} and DataSource eq '${dataSource}' and IsFolder eq false and contains(ServerRelativeUrl, '${SERVERRELATIVEURL}')`,
      });

      setFiles(files.value);
    } catch (error) {
      console.log("Error getting files: ", error);
    } finally {
      setLoadingState("");
    }
  };

  useEffect(() => {
    if (refId) handleGetFiles();
  }, [refId, dataSource]);

  // Hiển thị danh sách các file đã chọn
  const renderItem = ({ item }) => (
    <View className="flex flex-row gap-2 items-center justify-between   rounded-lg mb-2 w-full ">
      <Text className="text-black bg-gray-100 flex-1 px-2 py-3">
        {removeGuidFromFileName(item.Name)}
      </Text>
      <TouchableOpacity>
        <FontAwesome
          disabled={loadingState === `delete-${item.Id}`}
          name="trash"
          size={24}
          color="red"
          onPress={() => showModal(item)}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <React.Fragment>
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          disabled={loadingState === "upload"}
          onPress={pickFiles}
          className="bg-blue-500 p-4 rounded-full mb-4"
        >
          {loadingState === "upload" ? (
            <Text className="text-white font-bold">Uploading...</Text>
          ) : (
            <Text className="text-white font-bold">Pick Files</Text>
          )}
        </TouchableOpacity>

        <View className="flex flex-col w-full">
          {loadingState === "getFiles" ? (
            <Text className="text-black">Loading...</Text>
          ) : (
            <FlashList
              data={files}
              estimatedItemSize={50} // Ước lượng kích thước item
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              className="w-full"
            />
          )}
        </View>
      </View>
      <Portal>
        <Dialog visible={isShowDeleteModal} onDismiss={hideModal}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal} textColor="#6c757d">
              Cancel
            </Button>
            <Button textColor="#dc3545" onPress={handleDeleteFile}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
};

AttachFile.propTypes = propTypes;
export default AttachFile;
