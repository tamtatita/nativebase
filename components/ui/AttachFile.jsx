import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const AttachMultipleFiles = () => {
  const [files, setFiles] = useState([
    { name: "file1.pdf" },
    { name: "file2.docx" },
  ]);

  // Chọn nhiều file
  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (result.type === "success") {
        setFiles((prevFiles) => [...prevFiles, ...result.output]);
        console.log(result.output);
      }
    } catch (err) {
      console.log("Error picking files: ", err);
    }
  };

  // Hiển thị danh sách các file đã chọn
  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
      <Text className="text-black">{item.name}</Text>
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        onPress={pickFiles}
        className="bg-blue-500 p-4 rounded-full mb-4"
      >
        <Text className="text-white font-bold">Pick Files</Text>
      </TouchableOpacity>

      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        className="w-full"
      />
    </View>
  );
};

export default AttachMultipleFiles;
