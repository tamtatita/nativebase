import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

import NoImage from "../../assets/images/no-image.png";

import {
  deleteFileService,
  getItemsService,
  updateListItemService,
  uploadFileToDocLibService,
} from "../../utils/services";
import lists from "../../utils/lists";
import { ActivityIndicator } from "react-native-paper";

const SERVERRELATIVEURL = "/ImageStore";

const propTypes = {
  width: PropTypes.number,
  refId: PropTypes.number,
  dataSource: PropTypes.object,
  imageUrlColumn: PropTypes.string,
  allowEdit: PropTypes.bool,
  defaultSource: PropTypes.any,
};

const ImageUploader = ({
  width = 100,
  refId = 1,
  dataSource = lists.Users,
  imageUrlColumn,
  allowEdit = true,
  defaultSource = NoImage,
}) => {
  const [item, setItem] = useState(null);
  const [loadingState, setLoadingState] = useState("");

  const fetchImage = async () => {
    try {
      setLoadingState("fetch");
      const itemResponse = await getItemsService(lists.StoreRecords, {
        filter: `RefID eq ${refId} and DataSource eq '${dataSource.listName}' and IsFolder eq false and contains(ServerRelativeUrl, '${SERVERRELATIVEURL}')`,
      });
      const item = itemResponse.value[0];
      setItem(item);
    } catch (error) {
      // notiError("Không thể tải ảnh từ server!");
    } finally {
      setLoadingState("");
    }
  };

  const pickImage = async () => {
    try {
      setLoadingState("upload");
      let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.5,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0]; // File thông tin từ DocumentPicker

      const audioFile = {
        name: `${uuid.v4()}_${file.fileName}`,
        uri: file.uri,
        type: file.mimeType,
        size: file.fileSize,
      };

      const [newFiles] = await Promise.all([
        uploadFileToDocLibService(
          SERVERRELATIVEURL,
          audioFile.name,
          refId,
          dataSource.listName,
          audioFile
        ),
        item?.Id && deleteFileService(item.ServerRelativeUrl),
      ]);
      if (imageUrlColumn) {
        await updateListItemService(dataSource, refId, {
          [imageUrlColumn]: newFiles.downloadUrl,
        });
      }
      setItem(newFiles);
      console.log(newFiles);
    } catch (error) {
      console.log("Error picking image: ", error);
    } finally {
      setLoadingState("");
    }
  };
  //   Load image content khi component load lần đầu
  useEffect(() => {
    if (refId) fetchImage();
  }, [refId, dataSource]);
  return (
    <View className="relative ">
      <Image
        style={{ width: width, height: width }}
        source={item?.downloadUrl ? { uri: item.downloadUrl } : defaultSource}
        className=" rounded-full"
      />

      {loadingState === "fetch" && (
        <View className="absolute  w-full h-full flex flex-row justify-center">
          <ActivityIndicator animating={true} />
        </View>
      )}

      {allowEdit && (
        <TouchableOpacity
          className="absolute bottom-0 right-0 bg-primary rounded-full p-2"
          disabled={loadingState === "upload"}
          onPress={pickImage}
        >
          <FontAwesome name="pencil" size={16} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

ImageUploader.propTypes = propTypes;
export default memo(ImageUploader);
