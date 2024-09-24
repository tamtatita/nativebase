import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { width } from "@/lib/InfoDevice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
import { IconButton } from "../ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatCurrencyRange } from "@/utils";
import { Link, router } from "expo-router";
const JobItem = ({ data, type }) => {
  return (
    <View
      style={{
        width: type === "small" ? width - 100 : width - 40,
        backgroundColor: "white",
        padding: 13,
        borderRadius: 16,
        border: "1px solid gray",
        height: "700px",
        marginRight: 15,
        gap: 6,
        marginBottom: type === "small" ? 0 : 15,
      }}
    >
      <TouchableOpacity onPress={() => router.push(`/job/${data?.id}`)}>
        {/* Header (Ảnh và nút lưu) */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Image
              source={{ uri: data?.image_company }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View className="flex">
              <Text className="font-bold text-lg text-slate-700">
                {data?.title}
              </Text>
              <Text className="font-medium text-[14px] text-slate-700">
                {data?.company}
              </Text>
            </View>
          </View>
          <View>
            <IconButton
              size={"small"}
              shape="circle"
              color="transparent"
              icon={
                <Ionicons
                  name="bookmark-outline"
                  size={24}
                  color={Colors.primary}
                />
              }
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Location */}
      <View className="flex flex-row items-center gap-4">
        <FontAwesome5 name="map-marker-alt" size={24} color={Colors.primary} />

        <Text className="font-semibold text-[15px] text-slate-500">
          {data?.location}
        </Text>
      </View>

      {/* Kiểu tuyển dụng */}
      <View className="flex flex-row items-center gap-3 mt-3">
        {data?.type?.slice(0, 3).map((item, index) => (
          <Text
            key={index}
            className="bg-slate-100 text-slate-700 p-2 font-semibold rounded-lg"
          >
            {item}
          </Text>
        ))}
        {data?.type.length > 3 && (
          <Text className="bg-slate-100 text-slate-700 p-2 font-semibold rounded-lg">
            +{data?.type.length - 3}
          </Text>
        )}
      </View>

      {/* Divider */}
      <View className="border-b my-4 border-gray-300 mt-3"></View>
      {/* Applicants view và mức lương */}
      <View className="flex flex-row items-center justify-between">
        <View>
          <View className="flex flex-row -space-x-1 overflow-hidden">
            <Image
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <Image
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <Image
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <Image
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </View>

          <Text className="text-slate-500 font-semibold mt-2">
            {data?.applicantsView} Applicants
          </Text>
        </View>

        <View>
          <View className="mt-2 flex flex-row items-center">
            <Text className="text-primary font-bold text-lg">
              {formatCurrencyRange(data?.salary)}
            </Text>
            <Text className="text-sm font-semibold text-slate-500 ml-2">
              /Month
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default JobItem;

const styles = StyleSheet.create({});
