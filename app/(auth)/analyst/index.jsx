import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { IconButton } from "../../../components/ui";
import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { BarChart } from "react-native-gifted-charts";
import { Colors } from "../../../constants/Colors";

const AnalystPage = () => {
  const RenderHeader = memo(() => {
    return (
      <View>
        <SafeAreaView />
        <View className="flex-row flex items-center justify-between p-5 ">
          <IconButton type="back" />
          <Text className="text-lg font-bold text-slate-700">
            Thống kê hoạt động
          </Text>
          <IconButton
            type=""
            icon={<Feather name="search" size={24} color="black" />}
          />
        </View>
      </View>
    );
  });

  const RenderChart = useCallback(() => {
    const barData = [
      { value: 3, label: "M" },
      { value: 5, label: "T", frontColor: Colors.primary },
      { value: 1, label: "W", frontColor: Colors.primary },
      { value: 0, label: "T" },
      { value: 10, label: "F", frontColor: Colors.primary },
      { value: 2, label: "S" },
      { value: 4, label: "S" },
    ];
    return (
      <View className="p-5">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold text-lg text-slate-700">
            Các Job đã ứng tuyển
          </Text>
          <Text className="text-gray-600">Last 7 days</Text>
        </View>

        <View className="bg-white p-3 rounded-xl my-4">
          <BarChart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            // showReferenceLine1
            // referenceLine1Position={420}
            // referenceLine1Config={{
            //   color: "gray",
            //   dashWidth: 2,
            //   dashGap: 3,
            // }}
          />
        </View>
      </View>
    );
  }, []);

  return (
    <FlashList
      ListHeaderComponent={() => (
        <>
          <RenderHeader />

          <RenderChart />
        </>
      )}
    />
  );
};

export default AnalystPage;

const styles = StyleSheet.create({});
