import { SafeAreaView, TextInput, View } from "react-native";
import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "@/components/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import RecentJobs from "@/components/home/RecentJobs";
import SuggestedJob from "./../../components/home/SuggestedJob";
const Index = () => {
  const locations = [
    { label: "Hồ Chí Minh", value: "hochiminh" },
    { label: "Hà Nội", value: "hanoi" },
    { label: "Đà Nẵng", value: "danang" },
    { label: "Nha Trang", value: "nhatrang" },
    { label: "Hội An", value: "hoian" },
    { label: "Phú Quốc", value: "phuquoc" },
    { label: "Vũng Tàu", value: "vungtau" },
    { label: "Đà Lạt", value: "dalat" },
    { label: "Quy Nhơn", value: "quynhon" },
    { label: "Cần Thơ", value: "cantho" },
    { label: "Hải Phòng", value: "haiphong" },
    { label: "Hạ Long", value: "halong" },
    { label: "Sapa", value: "sapa" },
    { label: "Huế", value: "hue" },
    { label: "Hội An", value: "hoian" },
    { label: "Vinh", value: "vinh" },
    { label: "Buôn Ma Thuột", value: "buonmathuot" },
    { label: "Bắc Ninh", value: "bacninh" },
    { label: "Bắc Giang", value: "bacgiang" },
    { label: "Bắc Kạn", value: "backan" },
    { label: "Bạc Liêu", value: "baclieu" },
    { label: "Bến Tre", value: "bentre" },
    { label: "Bình Định", value: "binhdinh" },
    { label: "Bình Dương", value: "binhduong" },
    { label: "Bình Phước", value: "binhphuoc" },
    { label: "Bình Thuận", value: "binhthuan" },
    { label: "Cà Mau", value: "camau" },
    { label: "Cao Bằng", value: "caobang" },
    { label: "Đắk Lắk", value: "daklak" },
    { label: "Đắk Nông", value: "daknong" },
  ];
  const RenderSearchTop = useCallback(() => {
    return (
      <View className="bg-primary h-[200px] p-5 rounded-bl-3xl rounded-br-3xl">
        <SafeAreaView />

        {/* Location And Notifi BTN */}
        <View className="flex items-center justify-between flex-row">
          <View className="flex items-center flex-row  justify-center">
            <View>
              <FontAwesome5 name="map-marker-alt" size={20} color="yellow" />
            </View>

            <View className="w-[160px] ml-3">
              <Dropdown
                data={locations}
                search
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                placeholder="Location"
                placeholderStyle={{ color: "white" }}
              />
            </View>
          </View>
          <View className="flex items-center justify-center">
            <IconButton
              onPress={() => router.push("/(tabs)/notification")}
              shape={"roundedSquare"}
              size={"small"}
              classNames={"rounded-xl"}
              color="#6366f1"
              icon={
                <Ionicons name="notifications-sharp" size={24} color="white" />
              }
            />
          </View>
        </View>

        {/* Search Bar */}

        <View className="flex flex-row gap-4 items-center my-4 ">
          {/* Input Search */}
          <View className="bg-white h-[60px] flex items-start justify-center mt-5 rounded-xl flex-1">
            <View className="flex flex-1 items-center flex-row p-3">
              <View>
                <Ionicons name="search" size={24} color="gray" />
              </View>
              <View className="flex-1 ml-2">
                <TextInput
                  onPress={() => router.push("/search")}
                  placeholder="Search ...."
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <FlashList
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      estimatedItemSize={6}
      ListHeaderComponent={() => (
        <>
          <RenderSearchTop />

          <View className="">
            <SuggestedJob />

            <RecentJobs />
          </View>
        </>
      )}
    />
  );
};

export default Index;
