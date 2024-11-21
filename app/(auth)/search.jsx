import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { JobItem } from "@/components";
import { getItemsService } from "../../utils/services";
import lists from "../../utils/lists";
const Search = () => {
  const recentSearch = ["UI, UX", "Frontend", "Backend"];
  const recentView = [
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
  const [accounts, setAccounts] = React.useState([]);

  const RenderHeader = useCallback(() => {
    return (
      <View>
        <SafeAreaView />
        <View className="flex flex-row items-center  justify-between">
          <View>
            <IconButton type="back" size="small" />
          </View>

          <View className="bg-white h-[60px] flex items-start justify-center  rounded-xl w-[80%]">
            <View className="flex flex-1 items-center flex-row p-3">
              <View>
                <Ionicons name="search" size={24} color="gray" />
              </View>
              <View className="flex-1 ml-2">
                <TextInput
                  //   onPress={() => router.push("/search")}
                  placeholder="Search ...."
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }, []);

  const RenderRecentSearch = useCallback(() => {
    return (
      <View className="mt-4">
        <Text className="font-bold text-lg text-slate-700">Recent Search</Text>

        <View>
          <FlashList
            estimatedItemSize={3}
            data={recentSearch}
            renderItem={({ item }) => (
              <View className="flex flex-row items-center justify-between p-2 ">
                <Text className="text-sm font-semibold text-slate-600">
                  {item}
                </Text>
                <IconButton
                  type="close"
                  color="transparent"
                  classNames="rounded-full"
                  size="small"
                  icon={<AntDesign name="close" size={24} color="black" />}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }, [recentSearch]);

  const RecentView = useCallback(() => {
    return (
      <View className="mt-4">
        <Text className="font-bold text-lg text-slate-700">Recent View</Text>

        <View className="mt-4">
          <FlashList
            data={recentView}
            renderItem={({ item }) => <JobItem data={item} type="full" />}
            estimatedItemSize={3}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            // showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }, [recentView]);
  return (
    <View className="p-5  flex-1">
      <FlashList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <RenderHeader />

            <RenderRecentSearch />

            <RecentView />
          </>
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
