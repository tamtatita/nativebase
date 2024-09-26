import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Button, IconButton } from "@/components/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CategoryItem, JobItem } from "@/components";
import { height } from "@/lib/InfoDevice";
import { router } from "expo-router";
const Index = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      image_company:
        "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
      location: "Hồ Chí Minh",
      salary: [1000000, 2000000],
      type: ["Full-time", "Remote", "Internship", "jao", "ó"],
      applicantsView: 432,
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Facebook",
      image_company:
        "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
      location: "Hà Nội",
      salary: [1000000, 2000000],
      type: ["Full-time", "On-site"],
      applicantsView: 987,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Amazon",
      image_company:
        "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
      location: "Đà Nẵng",
      salary: [1000000, 2000000],
      type: ["Remote", "Part-time"],
      applicantsView: 654,
    },
    {
      id: 4,
      title: "Mobile Developer",
      company: "Apple",
      image_company:
        "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
      location: "Hồ Chí Minh",
      salary: [1000000, 2000000],
      type: ["Full-time", "Remote"],
      applicantsView: 1230,
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Microsoft",
      image_company:
        "https://i.pinimg.com/564x/cf/11/eb/cf11ebcc0a874e3ad3830431f7b0ab58.jpg",
      location: "Hà Nội",
      salary: [100000, 200000],
      type: ["Full-time", "On-site", "Contract"],
      applicantsView: 789,
    },
  ];
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
      <View className="bg-primary h-[240px] p-5 rounded-bl-3xl rounded-br-3xl">
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
              onPress={() => router.push("/notification")}
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

          {/* Filter BTN */}
          <View className="flex items-center justify-center">
            <IconButton
              onPress={() => router.push("filter")}
              shape={"roundedSquare"}
              size={"medium"}
              classNames={"rounded-xl"}
              color="#eab308"
              icon={<Ionicons name="options" size={24} color="white" />}
            />
          </View>
        </View>
      </View>
    );
  }, []);

  const RenderSuggestedJobs = useCallback(() => {
    return (
      <View style={{ height: "inheric" }}>
        {/* Title */}
        <View className="flex p-5 flex-row items-center justify-between">
          <Text className="font-bold text-xl text-slate-700">
            Suggested Jobs
          </Text>

          <Button type={"link"} title={"See all"} />
        </View>

        {/* List Jobs */}
        <View className="w-full ml-5">
          <FlashList
            data={jobs}
            renderItem={({ item }) => <JobItem data={item} type="small" />}
            estimatedItemSize={3}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      </View>
    );
  }, []);

  const RenderRecentJobs = useCallback(() => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const category = [
      { id: 1, name: "All" },
      { id: 2, name: "Frontend Developer" },
      { id: 3, name: "Backend Developer" },
      { id: 4, name: "UI/UX Designer" },
      { id: 5, name: "Mobile Developer" },
      { id: 6, name: "Data Scientist" },
    ];
    return (
      <View className="mt-4">
        {/* Title */}
        <View className="flex flex-row items-center justify-between m-5">
          <Text className="font-bold text-xl text-slate-700">Recent Jobs</Text>

          <Button type={"link"} title={"See all"} />
        </View>

        {/* Category */}
        <View className="ml-5">
          <FlashList
            data={category}
            renderItem={({ item }) => (
              <CategoryItem data={item} currentIndex={currentIndex} />
            )}
            estimatedItemSize={3}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* List Jobs */}
        <View className="ml-5 mt-5">
          <FlashList
            data={jobs}
            renderItem={({ item }) => <JobItem data={item} type="large" />}
            estimatedItemSize={1}
            keyExtractor={(item) => item.id.toString()}
            // scrollEnabled={true}
            // horizontal
            // showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }, []);
  return (
    <FlashList
      // style={{ height: height - 100 }}
      // contentContainerStyle={{ height: height }}
      // scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      estimatedItemSize={6}
      ListHeaderComponent={() => (
        <>
          <RenderSearchTop />

          <View className=" flex ">
            <RenderSuggestedJobs />

            <RenderRecentJobs />
          </View>
        </>
      )}
    />
  );
};

export default Index;

const styles = StyleSheet.create({});
