import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TitleHeader = ({ title, desc }) => {
  return (
    <View className="flex flex-col items-center justify-center my-3">
      <Text className="font-bold text-3xl text-slate-700">{title}</Text>
      <Text className="text-gray-500 text-center text-sm max-w-xl">{desc}</Text>
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({});
