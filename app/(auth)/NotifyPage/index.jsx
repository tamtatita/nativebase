import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ApplicationSuccess() {
  const { message, notifyType } = useLocalSearchParams();
  const router = useRouter();

  // Xác định màu nền và biểu tượng dựa vào notifyType
  const notifyStyles = {
    success: { backgroundColor: "green", icon: "check" },
    warning: { backgroundColor: "orange", icon: "alert" },
    danger: { backgroundColor: "red", icon: "close" },
  };

  const { icon } = notifyStyles[notifyType] || notifyStyles.success;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="px-4 py-2">
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
      </View>
      <View className="flex-1 items-center justify-center px-4">
        <View
          //   style={{ backgroundColor }}
          className="rounded-full w-20 h-20 items-center justify-center mb-6 bg-primary"
        >
          <IconButton icon={icon} iconColor="white" size={40} />
        </View>
        <Text className="text-2xl font-bold mb-4">
          {notifyType === "success"
            ? "Congratulations!"
            : notifyType === "warning"
            ? "Warning!"
            : "Error!"}
        </Text>
        <Text className="text-gray-600 text-center mb-1">
          {message || "Your Application has been Successfully Sent!"}
        </Text>

        <Button
          mode="contained"
          onPress={() => router.push("/MyApplication")}
          className="w-full my-4 bg-primary"
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ fontSize: 16 }}
        >
          Go to My Application
        </Button>
        <Button
          mode="text"
          onPress={() => router.back()}
          className="w-full"
          labelStyle={{ fontSize: 16, color: "blue" }}
        >
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  );
}
