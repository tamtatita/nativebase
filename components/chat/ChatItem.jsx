import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { formatISOTOAgo, formatISOToDateTime } from "@/utils";

const ChatItem = ({ data, userChat, user }) => {
  return (
    <View
      className={`w-full mb-5 flex ${
        data?.isMe ? "justify-end items-start" : "justify-start items-end"
      }`}
    >
      <View className="max-w-[86%]">
        <View
          className={`${
            data?.isMe ? "bg-primary text-white" : "bg-gray-200 text-slate-700"
          } rounded-full w-fit p-3`}
        >
          <Text
            className={`${
              data?.isMe ? "text-white" : "text-gray-800 text-right"
            } font-semibold`}
          >
            {data?.message}
          </Text>
        </View>

        <View
          className={`flex ${
            data?.isMe ? "flex-row" : "flex-row-reverse"
          } items-center justify-between mt-1`}
        >
          <Image
            source={{ uri: data?.isMe ? user?.avatar : userChat?.avatar }}
            className="w-[35px] h-[35px] object-cover rounded-full"
          />

          <Text className="text-sm text-gray-500">
            {formatISOToDateTime(data?.timestamp)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({});
