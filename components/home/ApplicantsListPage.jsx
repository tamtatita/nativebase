import React, { memo, useMemo } from "react";
import { View, Text, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { MODULE_JOBDETAIL } from "@/store/jobdetail";
import NoImage from "@/assets/images/no-image.png";
import { JOBAPPLICATIONSTATUS } from "@/constants";
import { useAuth } from "../providers/AuthProvider";
// Mock data for the people list

function ApplicantsListPage() {
  const { applicationForms, jobDetail } = useSelector(
    (state) => state[MODULE_JOBDETAIL]
  );
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-base font-medium text-gray-600">
          People ({applicationForms.length})
        </Text>
      </View>
      <FlashList
        data={applicationForms}
        extraData={[currentUser, jobDetail]}
        renderItem={({ item }) => {
          let color;
          let bg;
          switch (item?.Status) {
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
            <TouchableOpacity
              disabled={currentUser?.id !== jobDetail?.RecruiterId}
              className={`flex flex-row items-center  px-4 py-2 bg-slate-50 mb-2 ${bg}`}
              onPress={() =>
                router.push(
                  `/(auth)/jobapplicationform/?UserId=${item.UserId}&&JobId=${item.JobId}`
                )
              }
            >
              <Image
                source={item?.User.ImageUrl ? { uri: item.ImageUrl } : NoImage}
                className="w-12 h-12 rounded-full"
              />
              <View className="ml-3">
                <Text className="text-base font-semibold text-gray-900">
                  {item?.User.FullName || "No name"}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item?.User?.JobTitle?.Title || "N/A"}
                </Text>
              </View>
              {currentUser?.id === jobDetail?.RecruiterId && (
                <View className=" rounded-md flex-1 items-end ">
                  <Text
                    className="capitalize font-semibold px-3 py-2"
                    style={{ backgroundColor: bg, color: color }}
                  >
                    {item?.Status}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        estimatedItemSize={56}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 8 }}
        drawDistance={2}
      />
    </View>
  );
}

ApplicantsListPage.propTypes = {
  data: PropTypes.array,
};

export default memo(ApplicantsListPage);
