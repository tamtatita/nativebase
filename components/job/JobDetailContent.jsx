import { Image, Text, View } from "react-native";
import React, { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { formatCurrencyRange } from "@/utils";
import NoImage from "@/assets/images/no-image.png";
import { useSelector } from "react-redux";
import { MODULE_JOBDETAIL } from "../../store/jobdetail";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";

const DEADLINESTATUS = {
  Urgent: "Urgent",
  Expired: "Expired",
  Normal: "Normal",
};

function JobDetailContent() {
  const dataFetch = [
    {
      id: 1,
      name: "Salary ( Monthly)",
      icon: (
        <FontAwesome5 name="money-bill-wave" size={24} color={Colors.primary} />
      ),
    },
    {
      id: 2,
      name: "Job Type",
      icon: (
        <MaterialIcons name="type-specimen" size={24} color={Colors.primary} />
      ),
    },
    {
      id: 3,
      name: "Working Model",
      icon: (
        <FontAwesome5 name="network-wired" size={24} color={Colors.primary} />
      ),
    },
    {
      id: 4,
      name: "Level",
      icon: (
        <MaterialCommunityIcons
          name="spirit-level"
          size={24}
          color={Colors.primary}
        />
      ),
    },
  ];

  const { jobDetail } = useSelector((state) => state[MODULE_JOBDETAIL]);

  const deadlineStatus = useMemo(() => {
    const deadline = dayjs(jobDetail?.Deadline);
    const now = dayjs();

    if (deadline.isBefore(now) || !jobDetail?.Deadline) return "Expired";
    if (deadline.diff(now, "day") <= 1) return "Urgent";
    return "Normal";
  }, [jobDetail]);

  return (
    <View className="bg-white rounded-tl-3xl rounded-tr-3xl relative w-full">
      <View className="flex items-center justify-center absolute -top-[50px] w-full">
        <Image
          source={jobDetail?.ImageUrl ? { uri: jobDetail?.ImageUrl } : NoImage}
          width={60}
          height={60}
          className="w-[80px] h-[80px] object-cover rounded-full"
        />
      </View>

      {/* Tiêu đề bài đăng */}
      <View
        className="flex flex-col items-center justify-center p-4 mt-10 "
        style={{ gap: 10 }}
      >
        <Text className="font-bold text-[19px] text-slate-800 text-center">
          {jobDetail?.Title}
        </Text>
        <Text className="text-gray-600 font-semibold text-[15px]">
          {jobDetail?.Recruiter?.FullName || "N/A"}
        </Text>

        <View className="flex items-center flex-row gap-3">
          <FontAwesome5
            name="map-marker-alt"
            size={24}
            color={Colors.primary}
          />
          <Text className="font-semibold text-gray-500 text-[15px]">
            {jobDetail?.Recruiter?.CompanyLocation || "N/A"}
          </Text>
        </View>
      </View>

      {/* Danh sách lương, loại công việc */}
      <View className="flex flex-row flex-wrap gap-2 px-3 justify-between ">
        {dataFetch.map((item, index) => (
          <View
            style={{ width: `${50 - 3}%` }}
            className="flex items-center flex-row flex-wrap p-2 bg-white border-[1px] border-gray-300 rounded-lg"
            key={index}
          >
            <View className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
              {item.icon}
            </View>
            <View className="flex-1 ml-3 gap-y-1">
              <Text className="font-semibold text-gray-500">{item.name}</Text>
              {index === 0 && (
                <Text className="text-primary font-semibold">
                  {jobDetail?.MinSalary &&
                    jobDetail?.MaxSalary &&
                    formatCurrencyRange([
                      jobDetail?.MinSalary,
                      jobDetail?.MaxSalary,
                    ])}
                </Text>
              )}

              {index === 1 && (
                <Text className="text-primary font-semibold">
                  {jobDetail?.JobType?.Title || "N/A"}
                </Text>
              )}

              {index === 2 && (
                <Text className="text-primary font-semibold">
                  {jobDetail?.WorkingModel?.Title || "N/A"}
                </Text>
              )}

              {index === 3 && (
                <Text className="text-primary font-semibold">
                  {jobDetail?.Experience?.Title || "N/A"}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
      <View className="flex items-center flex-row justify-center gap-2 px-3 mt-4">
        <Ionicons
          name="calendar-outline"
          size={24}
          color={
            deadlineStatus === DEADLINESTATUS.Expired
              ? "red"
              : deadlineStatus === DEADLINESTATUS.Urgent
              ? "orange"
              : "gray"
          }
        />
        <Text
          className={`font-semibold ${
            deadlineStatus === DEADLINESTATUS.Expired
              ? "text-red-500"
              : deadlineStatus === DEADLINESTATUS.Urgent
              ? "text-yellow-500"
              : "text-gray-500"
          }`}
        >
          Expire Date:{" "}
          {jobDetail?.Deadline
            ? dayjs(jobDetail?.Deadline).format("DD/MM/YYYY HH:mm")
            : null}
        </Text>
      </View>
    </View>
  );
}

export default JobDetailContent;
