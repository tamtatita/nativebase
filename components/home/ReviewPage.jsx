import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Button } from "../ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
const ReviewPage = () => {
  return (
    <View className="p-5 bg-white">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-semibold text-[16px] my-2">Review</Text>

        <Button type={"link"} title={"Add review"} />
      </View>

      {/* Search Review */}
      <View className="flex flex-row items-center justify-between my-4">
        {/* Input Search */}
        <View className="bg-gray-200 h-[50px] flex items-start justify-center mt-3 rounded-xl flex-1">
          <View className="flex flex-1 items-center flex-row p-3">
            <View>
              <Ionicons name="search" size={24} color={Colors.primary} />
            </View>
            <View className="flex-1 ml-2">
              <TextInput placeholder="Search ...." />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewPage;

const styles = StyleSheet.create({});
