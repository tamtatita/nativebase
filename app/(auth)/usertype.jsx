import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
const USERTYPES = [
  {
    Title: "Recruiter",
    Icon: <AntDesign name="user" size={24} color="black" />,
  },
  {
    Title: "Candidate",
    Icon: <FontAwesome name="user" size={24} color="black" />,
  },
];
function UserType() {
  return (
    <SafeAreaView className="flex-1 flex justify-center items-center bg-[#797979]">
      <View className="h-1/2 w-5/6 px-4  flex flex-col justify-around bg-[#DCDCDE] shadow-sm">
        <View className="flex">
          <Text className="font-bold text-2xl">SELECT USER TYPE </Text>
          <View className="h-2 w-5 bg-primary rounded-sm"></View>
        </View>
        <View className="flex flex-row justify-center items-center gap-2">
          {USERTYPES.map((type) => (
            <TouchableOpacity className="p-6 flex flex-col items-center bg-white">
              {type.Icon}
              <Text>{type.Title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex flex-row justify-center gap-2">
          <TouchableOpacity className=" bg-white flex justify-center px-9 rounded-xl">
            <Text className="text-center">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity className=" bg-primary p-2 rounded-full">
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default UserType;
