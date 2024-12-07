import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import { IconButton } from "@/components/ui";
import "react-native-gesture-handler";

function FilterHeader() {
  return (
    <View>
      <SafeAreaView />
      <View className="flex items-center justify-between flex-row">
        <IconButton type="back" size="small" />
        <Text className="font-bold text-lg">Filter</Text>
        <Text className="opacity-0">gewjjjjjjjjjj</Text>
      </View>
    </View>
  );
}

export default FilterHeader;
