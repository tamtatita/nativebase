import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { IconButton, InputLabel, Button, Toast } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { HelperText, TextInput } from "react-native-paper";
import { router } from "expo-router";

export default function JobApplicationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [additionalText, setAdditionalText] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    router.push(
      `(auth)/NotifyPage?message=${encodeURIComponent(
        "Your application was successful!"
      )}&notifyType=warning`
    );
  };

  return (
    <SafeAreaView className="flex-1 p-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex flex-row items-center mb-4">
            <IconButton type="back" />
            <Text className="text-xl flex-1 font-semibold pl-6">
              Apply for Job
            </Text>
          </View>

          <View className="mb-4">
            <InputLabel title="Full Name" size="small" />
            <TextInput
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName} // Chuyển từ onChange thành onChangeText
              className=" bg-gray-200"
            />
            <HelperText type="error" visible={true} te>
              Required
            </HelperText>
          </View>
          <View className="mb-4">
            <InputLabel title="Email" size="small" />
            <TextInput
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail} // Chuyển từ onChange thành onChangeText
              className="mb-4 bg-gray-200"
            />
          </View>

          <View>
            <InputLabel title="Upload CV/Resume" size="small" />
            <View className="flex-row items-center justify-center border border-gray-300 rounded-md p-4 mb-4">
              <AntDesign name="file1" size={24} color="#4B5FFA" />
              <Text className="ml-2 text-gray-500">Browse File</Text>
            </View>
          </View>

          <View>
            <InputLabel title="Add Text" size="small" />
            <TextInput
              placeholder="Write Something here..."
              value={additionalText}
              onChangeText={setAdditionalText}
              multiline={true}
              numberOfLines={10}
              className="border border-gray-300 bg-gray-200 rounded-md p-2 mb-6"
            />
          </View>
        </ScrollView>

        {/* Button section */}
        <View style={{ paddingBottom: 20 }}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            classNames="w-full py-3 bg-primary rounded-md"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}