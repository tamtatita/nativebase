import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Section = ({ title, iconTitle, children }) => {
  return (
    <View className="p-4 border border-gray-400 rounded-xl ">
      <View className="flex-row items-center mb-2">
        {iconTitle}
        <Text className="ml-2 text-lg font-bold">{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default Section;
