import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IconButton } from "../ui";
import { Colors } from "@/constants/Colors";
const CompanyPage = ({ data }) => {
  return (
    <View className="bg-white p-5">
      {/* About */}
      <Text className="font-semibold text-[16px] my-2">About company</Text>

      <Text className="text-gray-500 tracking-wider">
        {data?.about?.aboutJob}
      </Text>

      {/* Contact */}
      <Text className="font-semibold text-[16px] my-2">Company Contact</Text>

      <View className="flex flex-row items-center justify-between my-4">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{ uri: data?.company_contact?.avatar }}
            width={40}
            height={40}
            className="w-[50px] h-[50px] object-cover rounded-full"
          />

          <View>
            <Text className="font-semibold text-[16px] text-slate-700">
              {data?.company_contact?.name}
            </Text>
            <Text className="text-gray-600">
              {data?.company_contact?.position}
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center gap-3">
          <IconButton
            size={"small"}
            icon={<MaterialIcons name="message" size={24} color="black" />}
            shape={"circle"}
            classNames={"rounded-full"}
            // color={Colors.primary}
          />
          {/* <Text>{data?.company_contact?.phone}</Text> */}
        </View>
      </View>

      {/* Working Hours */}
      <Text className="font-semibold text-[16px] my-2">Working Hours</Text>
    </View>
  );
};

export default CompanyPage;

const styles = StyleSheet.create({});
