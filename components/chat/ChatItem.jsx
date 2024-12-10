import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { formatISOTOAgo, formatISOToDateTime } from "@/utils";
import PropTypes from "prop-types";
import FeMaleImage from "@/assets/images/female-avatar.png";
import MaleImage from "@/assets/images/male-avatar.png";
import { useSelector } from "react-redux";
import { MODULE_AUTH } from "@/store/auth";
import { useAuth } from "../providers/AuthProvider";
import { GENDERS } from "@/constants";
import { router } from "expo-router";
const propTypes = {
  data: PropTypes.object,
};

const ChatItem = ({ data }) => {
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile.user;
  }, [profile]);
  const isMe = useMemo(
    () => currentUser?.id == data?.SenderId,
    [currentUser, data]
  );

  const imageSrc = useMemo(() => {
    if (data?.Sender?.ImageUrl) {
      return { uri: data?.Sender?.ImageUrl };
    }
    return data?.Sender?.Gender === GENDERS.MALE ? MaleImage : FeMaleImage;
  }, [data]);

  if (data?.IsSystemMessage) {
    return (
      <View className="flex items-center justify-center mb-5">
        <Text className="text-sm text-gray-500">
          {data?.Recruiter?.FullName} has accepted the job application.
        </Text>
        <TouchableOpacity onPress={() => router.push(`/job/${data.JobId}`)}>
          <Text className="text-primary">View detail</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      className={`w-full mb-5 flex ${
        !isMe ? "justify-end items-start" : "justify-start items-end"
      }`}
    >
      <View className="max-w-[86%]  ">
        <View
          className={`flex flex-row ${isMe ? "justify-end" : "justify-start"}`}
        >
          <View
            className={`${
              isMe ? "bg-primary text-white" : "bg-gray-200 text-slate-700"
            } rounded-full  p-3 `}
          >
            <Text
              className={`${
                isMe ? "text-white" : "text-gray-800 "
              } font-semibold `}
            >
              {data?.Message}
            </Text>
          </View>
        </View>

        <View
          className={`flex ${
            !isMe ? "flex-row" : "flex-row-reverse"
          } items-center justify-between mt-1`}
        >
          <Image
            // source={{ uri: isMe ? user?.avatar : userChat?.avatar }}
            source={imageSrc}
            className="w-[35px] h-[35px] object-cover rounded-full"
          />

          <Text className="text-sm text-gray-500">
            {formatISOToDateTime(data?.Created)}
          </Text>
        </View>
      </View>
    </View>
  );
};

ChatItem.propTypes = propTypes;
export default ChatItem;

const styles = StyleSheet.create({});
