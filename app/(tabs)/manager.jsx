import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { width } from "@/lib/InfoDevice";
import ListJobApplied from "../../components/manager/ListJobApplied";
const ManagerJob = () => {
  const Header = () => {
    return (
      <View>
        <SafeAreaView />
        <View className="flex flex-col items-center justify-between">
          <Text className="font-bold text-lg">
            Trang quản trị cho Nhà tuyển dụng
          </Text>
        </View>
      </View>
    );
  };

  const RenderButtonCreate = () => {
    return (
      <View className="p-5">
        <TouchableOpacity>
          <View className="flex flex-row items-center justify-center p-3 mt-5 bg-primary rounded-lg">
            <AntDesign name="plus" size={24} color="white" />
            <Text className="ml-2 text-white font-bold text-lg">
              Tạo công việc
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderBody = useCallback(() => {
    const dataJob = [
      {
        id: 1,
        title: "Tuyển dụng nhân viên kinh doanh",
        salary: [10000000, 20000000],
        location: "Hồ Chí Minh",
        time: "1 ngày trước",
        status: "pending",
        timestamp: "2024-10-02T13:47:04.234Z",
        applied: 400,
        applicants: [
          {
            id: 2,
            name: "Châu Quốc Thanh",
            image_url:
              "https://i.pinimg.com/564x/a7/4e/65/a74e65112401e20ab867df7b4621a1ec.jpg",
            linkCV: "11",
          },
        ],
      },
    ];
    const empty = false;
    return (
      <View>
        {empty ? (
          <>
            <LottieView
              style={{ height: width - 20 }}
              source={require("../../assets/animation/Empty.json")}
              loop
              autoPlay
            />

            <Text className="text-center text-lg text-gray-800 font-semibold">
              Không có job
            </Text>
          </>
        ) : (
          <View className="p-5">
            <FlashList
              data={dataJob}
              renderItem={({ item }) => <ListJobApplied data={item} />}
              keyExtractor={(item) => item.id?.toString()}
              estimatedItemSize={2}
            />
          </View>
        )}
      </View>
    );
  }, []);
  return (
    <FlashList
      estimatedItemSize={2}
      ListHeaderComponent={() => (
        <>
          <Header />

          <RenderButtonCreate />

          <RenderBody />
        </>
      )}
    />
  );
};

export default ManagerJob;

const styles = StyleSheet.create({});
