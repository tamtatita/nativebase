import React from "react";
import { View, Text, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { router } from "expo-router";

// Mock data for the people list

const PersonItem = ({ item }) => (
  <TouchableOpacity
    className="flex-row items-center px-4 py-2 bg-slate-50 mb-2"
    onPress={() => router.push("/(auth)/jobapplicationform/1")}
  >
    <Image
      source={{ uri: item.avatar }}
      className="w-12 h-12 rounded-full "
      defaultSource={require("@/assets/images/avatar.png")}
    />
    <View className="ml-3">
      <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
      <Text className="text-sm text-gray-500">{item.role}</Text>
    </View>
  </TouchableOpacity>
);

function ApplicantsListPage({ data }) {
  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-base font-medium text-gray-600">
          People ({data.length})
        </Text>
      </View>
      <FlashList
        data={data}
        renderItem={({ item }) => <PersonItem item={item} />}
        estimatedItemSize={56}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 8 }}
        drawDistance={2}
      />
    </View>
  );
}

ApplicantsListPage.propTypes = {
  data: PropTypes.array,
};

export default ApplicantsListPage;
