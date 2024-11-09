import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, FlatList } from "react-native";

const AttachMultipleFiles = () => {
  const [files, setFiles] = useState([
    { name: "file1.pdf" },
    { name: "file2.docx" },
  ]);

  // Chọn nhiều file
  // const pickFiles = async () => {
  //   try {
  //     const res = await DocumentPicker.pickMultiple({
  //       type: "*/*", // Cho phép chọn mọi loại file
  //     });

  //     // Thêm các file đã chọn vào state
  //     setFiles((prevFiles) => [...prevFiles, ...res]);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log("User canceled the picker");
  //     } else {
  //       Alert.alert("Error picking files", err.message);
  //     }
  //   }
  // };

  // Hiển thị danh sách các file đã chọn
  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-2 bg-gray-100 rounded-lg mb-2">
      <Text className="text-black">{item.name}</Text>
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center ">
      <TouchableOpacity
        // onPress={pickFiles}
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
