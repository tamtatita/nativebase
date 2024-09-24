import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
const InputLabel = ({ title, danger, size }) => {
  // Xử lý className cho size
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "text-[17px]";
      case "medium":
        return "text-lg";
      case "large":
        return "text-xl";
      default:
        return "text-[17px]";
    }
  };

  // Xử lý className cho màu sắc (danger)
  const textColorClass = danger ? "text-red-500 text-[15px]" : "text-slate-700";

  return (
    <View className="flex flex-row items-center ">
      {danger && title !== "" && (
        <AntDesign
          name="warning"
          size={12}
          color="red"
          style={{ marginRight: 6 }}
        />
      )}
      <Text
        className={`font-semibold my-2 ${getSizeClass()} ${textColorClass}`}
      >
        {title}
      </Text>
    </View>
  );
};

export default InputLabel;

const styles = StyleSheet.create({});
