import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { width } from "@/lib/InfoDevice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
import { IconButton } from "../ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import lists from "@/utils/lists";
import {
  addListItemService,
  deleteListItemService,
  updateListItemService,
} from "@/utils/services";

import NoImage from "../../assets/images/no-image.png";
import PropTypes from "prop-types";
import { JOBAPPLICATIONSTATUS } from "@/constants";
import { formatCurrencyRange } from "@/utils";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  isHR: PropTypes.bool,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

const JobItem = ({ data, type, isHR, loading, setLoading }) => {
  const [currentBookmark, setCurrentBookmark] = useState(data?.bookmark);

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const RenderStatus = useCallback(() => {
    let color;
    let bg;
    switch (data?.status) {
      case JOBAPPLICATIONSTATUS.Sent:
        bg = "#e0e7ff";
        color = "#4f46e5";
        break;
      case JOBAPPLICATIONSTATUS.Accepted:
        bg = "#d1fae5";
        color = "#059669";
        break;
      case JOBAPPLICATIONSTATUS.Rejected:
        bg = "#fee2e2";
        color = "#dc2626";
        break;
      case JOBAPPLICATIONSTATUS.Pending:
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

  const checkStatus = useMemo(() => {
    if (data?.isActive === false) return false;
    const currentDate = new Date();
    const expiredDate = new Date(data?.deadline);
    return currentDate < expiredDate;
  }, [data]);

  // eslint-disable-next-line no-undef
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const popConfirmCloseJob = (id, name, isActive) => {
    const action = isActive ? "Close" : "Open";
    const message = `Are you sure you want to ${action.toLowerCase()} job ${name}?`;

    Alert.alert(`${action} job`, message, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => CallCloseJob(id, isActive) },
    ]);
  };

  const popConfirmDeleteJob = (id, name) => {
    Alert.alert("Delete job", `Are you sure you want to delete job ${name}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => CallDeleteJob(id) },
    ]);
  };

  const handleEditJob = (id) => {
    router.push({
      pathname: "/(auth)/jobpostform/[postId]",
      params: { id },
    });
  };

  const CallCloseJob = async (id, isActive) => {
    try {
      await delay(1000);

      // Cập nhật trạng thái công việc
      const response = await updateListItemService(lists.Jobs, id, {
        IsActive: !isActive,
      });

      Alert.alert(
        `${!isActive ? "Open" : "Close"} job`,
        `Job ${response?.Title} has been ${
          !isActive ? "opened" : "closed"
        } successfully`
      );

      setLoading((prev) => !prev); // Đảo trạng thái loading
    } catch (error) {
      console.error("Error closing job:", error);

      Alert.alert(
        `${!isActive ? "Open" : "Close"} job`,
        `An error occurred while trying to ${
          !isActive ? "open" : "close"
        } the job.`
      );
    }
  };

  const CallDeleteJob = async (id) => {
    try {
      await delay(1000);
      await deleteListItemService(lists.Jobs, id);
      Alert.alert("Delete job", `Job has been deleted`);
      setLoading(!loading);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Delete job", `Error when deleting job`);
    }
  };

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
      <TouchableOpacity onPress={() => router.push(`/job/${data?.id}?type=hr`)}>
        {/* Header (Ảnh và nút lưu) */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2 flex-1">
            <Image
              source={
                data?.image_company ? { uri: data?.image_company } : NoImage
              }
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View className="flex flex-col flex-1 ">
              <Text
                className="font-bold text-lg text-slate-700 "
                numberOfLines={2}
              >
                {data?.title}
              </Text>
              <Text className="font-medium text-[14px] text-slate-700">
                {data?.company}
              </Text>
            </View>
          </View>
          {!isHR && type !== "applied" ? (
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
      </View>
      {/* Trạng thái bài đăng */}
      <View
        style={{ width: 80 }}
        className={`px-4 py-2 my-1 rounded-md ${
          checkStatus ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <Text className={`text-white font-semibold text-[13px] text-center`}>
          {checkStatus ? "Active" : "Expired "}
        </Text>
      </View>

      {isHR && (
        <View className="flex justify-end items-end flex-row ">
          <IconButton
            onPress={() => handleEditJob(data?.id)}
            color={"#fbbf24"}
            classNames={" bg-red-100 rounded-md mr-4"}
            shape={"roundedSquare"}
            size={"small"}
            icon={<AntDesign name="edit" size={20} color="white" />}
          />

          <IconButton
            onPress={() =>
              popConfirmCloseJob(data?.id, data?.title, data?.isActive)
            }
            color={data?.isActive ? "#8b5cf6" : "gray"}
            classNames={" bg-red-600 rounded-md mr-4"}
            shape={"roundedSquare"}
            size={"small"}
            icon={
              <Entypo
                name={data?.isActive ? "lock-open" : "lock"}
                size={20}
                color="white"
              />
            }
          />

          <IconButton
            onPress={() => popConfirmDeleteJob(data?.id, data?.title)}
            color={"#f43f5e"}
            classNames={" bg-red-600 rounded-md"}
            shape={"roundedSquare"}
            size={"small"}
            icon={<AntDesign name="delete" size={20} color="white" />}
          />
        </View>
      )}

      {type !== "applied" && (
        <>
          {/* Divider */}
          <View className="border-b  border-gray-300 mt-3"></View>
          {/* Applicants view và mức lương */}
          <View className="flex flex-row items-center justify-between">
            <View>
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

JobItem.propTypes = propTypes;
export default JobItem;
