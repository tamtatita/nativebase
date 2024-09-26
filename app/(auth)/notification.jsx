import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "@/components/ui";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { formatISOTOAgo } from "@/utils";
const Notification = () => {
  const data = useMemo(() => {
    return [
      {
        id: 1,
        type: "submit",
        title: "Bạn đã ứng tuyển vị trí A thành công",
        timestamp: "2024-09-25T13:29:26.091Z",
      },

      {
        id: 2,
        type: "pending",
        title: "Nhà tuyển dụng đã xem CV của bạn",
        timestamp: "2024-09-25T13:29:26.091Z",
      },

      {
        id: 3,
        type: "cancel",
        title: "CV của bạn không phù hợp",
        timestamp: "2024-09-25T13:29:26.091Z",
      },

      {
        id: 4,
        type: "match",
        title: "CV của bạn được đánh giá là Phù hợp",
        timestamp: "2024-09-25T13:29:26.091Z",
      },
    ];
  }, []);
  const RenderHeader = useCallback(() => {
    return (
      <>
        <SafeAreaView />
        <View className="flex flex-row p-5 items-center justify-between">
          <IconButton type="back" size="small" />

          <Text className="font-bold text-lg">Notification</Text>

          <TouchableOpacity>
            <Text className="text-primary">Clear all</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }, []);
  const iconMap = {
    submit: <Feather name="send" size={24} color={Colors.sky} />,
    pending: (
      <Octicons name="package-dependencies" size={24} color={Colors.yellow} />
    ),
    cancel: (
      <MaterialIcons name="cancel-schedule-send" size={24} color={Colors.red} />
    ),
    match: <AntDesign name="checkcircleo" size={24} color={Colors.green} />,
  };

  const RenderBody = useCallback(() => {
    return (
      <View className="mt-5">
        <FlashList
          estimatedItemSize={10}
          keyExtractor={(item) => item.id.toString()}
          data={data}
          renderItem={({ item }) => (
            <View className="flex flex-col">
              <View className="flex flex-row items-center justify-start gap-x-4 p-5">
                <View className="p-3 rounded-full bg-gray-100/60">
                  <View>{iconMap[item.type]}</View>
                </View>

                <View className="gap-y-2">
                  <Text className="font-semibold text-[15px]">
                    {item.title}
                  </Text>
                  <Text className="text-[14px] text-gray-600">
                    {formatISOTOAgo(item.timestamp)}
                  </Text>
                </View>

                <View></View>
              </View>

              <View className="h-[1px] bg-gray-200"></View>
            </View>
          )}
        />
      </View>
    );
  }, [data]);
  return (
    <View className=" bg-white flex-1">
      <FlashList
        estimatedItemSize={2}
        ListHeaderComponent={() => {
          return (
            <>
              <RenderHeader />

              <RenderBody />
            </>
          );
        }}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
