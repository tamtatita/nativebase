import { Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { MODULE_JOBDETAIL } from "@/store/jobdetail";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const AboutPage = () => {
  const { jobDetail } = useSelector((state) => state[MODULE_JOBDETAIL]);
  return (
    <View className="bg-white p-5 ">
      <View className="flex flex-col">
        <View className=" my-2 flex flex-row gap-2">
          <FontAwesome name="venus-mars" size={20} color="black" />
          <Text className="font-semibold text-[16px]">Gender requirement</Text>
        </View>
        <Text className="text-gray-500 tracking-wider">
          {jobDetail?.Gender || "No"}
        </Text>
      </View>

      <View className="flex flex-col mt-3">
        <View className=" my-2 flex flex-row gap-2">
          <Ionicons name="information-circle-outline" size={20} color="black" />
          <Text className="font-semibold text-[16px]">About this Job</Text>
        </View>
        <Text className="text-gray-500 tracking-wider">
          {jobDetail?.Description || "No description"}
        </Text>
      </View>

      <View className="flex flex-col mt-3">
        <View className=" my-2 flex flex-row gap-2">
          <Ionicons name="list-circle-outline" size={20} color="black" />
          <Text className="font-semibold text-[16px]">Job Requirements</Text>
        </View>
        <Text className="text-gray-500 tracking-wider">
          {jobDetail?.Requirement || "No requirement"}
        </Text>
      </View>

      <View className="flex flex-col mt-3">
        <View className=" my-2 flex flex-row gap-2">
          <Ionicons name="time-outline" size={20} color="black" />
          <Text className="font-semibold text-[16px]">Working Hours</Text>
        </View>
        <Text className="text-gray-500 tracking-wider">
          {jobDetail?.WorkingHours || "N/A"}
        </Text>
      </View>
    </View>
  );
};

export default AboutPage;
