import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { formatCurrency, formatCurrencyRange, formatISOTOAgo } from "@/utils";

const ListJobApplied = ({ data }) => {
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

  return (
    <View className="border-[1px] border-primary p-3 bg-white rounded-md">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-bold">{data?.title}</Text>

        <RenderStatus />
      </View>

      <Text>{data?.location}</Text>

      <Text className="text-primary font-bold text-lg my-1">
        {formatCurrencyRange(data?.salary)}
      </Text>

      <Text className="italic font-semibold text-gray-500">
        {formatISOTOAgo(data?.timestamp)}
      </Text>

      <Text className="text-gray-500">{data?.applicants?.length} ứng viên</Text>
    </View>
  );
};

export default ListJobApplied;

const styles = StyleSheet.create({});
