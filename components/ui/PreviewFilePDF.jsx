import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Portal, Modal } from "react-native-paper";
import { WebView } from "react-native-webview";
import { removeGuidFromFileName } from "../../utils/helpers";

const propTypes = {
  handleDismiss: PropTypes.func,
  file: PropTypes.object,
};

function PreviewFilePDF({ handleDismiss, file }) {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (file?.downloadUrl) {
      setPdfUrl(
        `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
          file?.downloadUrl
        )}`
      );
    }
  }, [file]);

  console.log(pdfUrl);

  if (!pdfUrl) return null;

  return (
    <Portal>
      <Modal visible={true} className="px-5" onDismiss={handleDismiss}>
        <View className="bg-white p-4 h-4/5 rounded-md  ">
          <View className="flex flex-row items-center  mb-2">
            <Text className="flex-1 text-center font-bold">
              {removeGuidFromFileName(file?.Name)}
            </Text>
            <FontAwesome
              name="times"
              size={20}
              color={"gray"}
              onPress={handleDismiss}
            />
          </View>
          <WebView
            renderLoading={() => <Text>Loading...</Text>}
            source={{
              uri: pdfUrl,
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
}

PreviewFilePDF.propTypes = propTypes;
export default memo(PreviewFilePDF);
