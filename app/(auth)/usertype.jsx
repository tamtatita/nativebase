import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Colors } from "./../../constants/Colors";
import { router } from "expo-router";
import { useAuth } from "./../../components/providers/AuthProvider";
const USERTYPES = [
  {
    Title: "Recruiter",
    Icon: "user",
  },
  {
    Title: "Candidate",
    Icon: "users",
  },
];
function UserType() {
  const [userType, setUserType] = React.useState("");
  const { logout } = useAuth();
  const handleBack = () => {
    logout();
  };

  const handleNext = () => {
    if (userType.Title === "Candidate") {
      router.push("/(auth)/applicantprofile");
    } else {
      router.push("/(auth)/recruiterprofile");
    }
  };

  return (
    <SafeAreaView className="flex-1 flex justify-center items-center bg-[#797979]">
      <View className="h-1/2 w-5/6 px-4  flex flex-col justify-around bg-[#DCDCDE] shadow-sm rounded-xl">
        <View className="flex">
          <Text className="font-bold text-2xl">SELECT USER TYPE </Text>
          <View className="h-2 w-5 bg-primary rounded-sm"></View>
        </View>
        <View className="flex flex-row justify-center items-center gap-2">
          {USERTYPES.map((type) => (
            <TouchableOpacity
              key={type.Title}
              className={`p-6 flex flex-col items-center rounded-lg ${
                userType?.Title === type.Title
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
              onPress={() => setUserType(type)}
            >
              <FontAwesome
                name={type.Icon}
                size={30}
                color={
                  userType?.Title === type.Title ? "white" : Colors.primary
                }
              />
              <Text
                className={`${
                  userType?.Title === type.Title
                    ? "text-white font-bold text-lg"
                    : null
                }`}
              >
                {type.Title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex flex-row justify-center gap-2">
          <TouchableOpacity
            className=" bg-white flex justify-center px-9 rounded-xl"
            onPress={handleBack}
          >
            <Text className="text-center">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" bg-primary p-2 rounded-full"
            onPress={handleNext}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default UserType;
