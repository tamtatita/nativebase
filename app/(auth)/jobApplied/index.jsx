import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "../../../components/ui";
import { Feather } from "@expo/vector-icons";
import { JobItem } from "@/components";
const JobApplied = () => {
  const RenderHeader = memo(() => {
    return (
      <View>
        <SafeAreaView />
        <View className="flex-row flex items-center justify-between p-5 ">
          <IconButton type="back" />
          <Text className="text-lg font-bold text-slate-700">
            Các Job Đã Apply
          </Text>
          <IconButton
            type=""
            icon={<Feather name="search" size={24} color="black" />}
          />
        </View>
      </View>
    );
  });

  const data = [
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
      status: "sent",
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
      status: "accepted",
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
      status: "rejected",
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
      status: "pending",
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
      status: "sent",
    },
  ];
  const RenderBody = useCallback(() => {
    return (
      <View className="p-5">
        <FlashList
          estimatedListSize={4}
          data={data}
          renderItem={({ item }) => <JobItem data={item} type="applied" />}
        />
      </View>
    );
  }, [data]);
  return (
    <FlashList
      ListHeaderComponent={() => (
        <>
          <RenderHeader />

          <RenderBody />
        </>
      )}
    />
  );
};

export default JobApplied;

const styles = StyleSheet.create({});
