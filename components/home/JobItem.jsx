import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { width } from "@/lib/InfoDevice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
import { IconButton } from "../ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatCurrencyRange } from "@/utils";
import { Link, router } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import lists from "@/utils/lists";
import { addListItemService, deleteListItemService } from "@/utils/services";

import NoImage from "../../assets/images/no-image.png";
const JobItem = ({ data, type }) => {
  const [loading, setLoading] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState(data?.bookmark);

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const RenderStatus = useCallback(() => {
    let color;
    let bg;
    switch (data?.status) {
      case "sent":
        bg = "#e0e7ff";
        color = "#4f46e5";
        break;
      case "accepted":
        bg = "#d1fae5";
        color = "#059669";
        break;
      case "rejected":
        bg = "#fee2e2";
        color = "#dc2626";
        break;
      case "pending":
        bg = "#ffedd5";
        color = "#f97316";
        break;
      default:
        break;
    }

    return (
      <View style={{ backgroundColor: bg }} className="px-3 py-2 rounded-md">
        <Text className="capitalize font-semibold" style={{ color: color }}>
          {data?.status}
        </Text>
      </View>
    );
  }, [data]);

  useEffect(() => {
    setCurrentBookmark(data?.bookmark);
  }, [data]);

  const handleOnPressBookmark = useCallback(async () => {
    setLoading(true);
    try {
      if (currentBookmark?.Id) {
        await deleteListItemService(lists.Bookmarks, currentBookmark.Id);
        setCurrentBookmark({});
      } else {
        const bookmark = {
          UserId: currentUser?.id,
          JobId: data?.id,
        };
        const bookmarkResp = await addListItemService(
          lists.Bookmarks,
          bookmark
        );
        setCurrentBookmark(bookmarkResp);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, [currentBookmark, currentUser, data]);

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
              source={
                data?.image_company ? { uri: data?.image_company } : NoImage
              }
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
          {type !== "applied" ? (
            <View>
              <IconButton
                size={"small"}
                shape="circle"
                color="transparent"
                disabled={loading}
                icon={
                  <Ionicons
                    name={currentBookmark?.Id ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={Colors.yellow}
                  />
                }
                onPress={(e) => {
                  e.stopPropagation();
                  handleOnPressBookmark();
                }}
              />
            </View>
          ) : (
            <RenderStatus />
          )}
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

      {type !== "applied" && (
        <>
          {/* Divider */}
          <View className="border-b  border-gray-300 mt-3"></View>
          {/* Applicants view và mức lương */}
          <View className="flex flex-row items-center justify-between">
            <View>
              {/* <View className="flex flex-row -space-x-1 overflow-hidden">
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
              </View> */}

              <Text className="text-slate-500 font-semibold mt-2">
                {data?.applicantsView > 0
                  ? `${data.applicantsView} Applicants`
                  : "No Applicants"}
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
        </>
      )}
    </View>
  );
};

export default JobItem;

const styles = StyleSheet.create({});
