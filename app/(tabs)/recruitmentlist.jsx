import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Searchbar } from "react-native-paper";
import { IconButton } from "@/components/ui";
import { JobItem } from "@/components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const jobCategories = ["All", "Accountant", "BDM", "Content"];

const mockJobs = [
  {
    id: "1",
    title: "React Developer",
    company: "AmplifyAvenue",
    image_company: "https://example.com/amplifyavenue-logo.png",
    location: "Remote",
    type: ["Full-Time", "Remote", "Mid-Senior Level"],
    salary: [62000, 82000],
    applicantsView: 52,
    status: "pending",
  },
  {
    id: "2",
    title: "Accountant",
    company: "QubitLink Software",
    image_company: "https://example.com/qubitlink-logo.png",
    location: "New York, NY",
    type: ["Contract", "On-Site", "Associate"],
    salary: [42000, 42000],
    applicantsView: 52,
    status: "sent",
  },
  {
    id: "3",
    title: "React Native Developer",
    company: "YellowByte Innovations",
    image_company: "https://example.com/yellowbyte-logo.png",
    location: "San Francisco, CA",
    type: ["Contract", "On-Site", "Associate"],
    salary: [70000, 70000],
    applicantsView: 52,
    status: "accepted",
  },
  // Add more mock jobs as needed
];

export default function RecruitmentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 py-2 ">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="flex-1 text-xl font-bold text-center">
            Recruitment List
          </Text>
        </View>

        <View className="flex items-end justify-end my-4">
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded-md flex-row items-center gap-x-2"
            onPress={() => router.push("/(auth)/jobpostform/-1")}
          >
            <AntDesign name="plus" size={16} color="white" />
            <Text className="text-white font-semibold text-lg">Create Job</Text>
          </TouchableOpacity>
        </View>

        <Searchbar
          placeholder="Search jobs"
          onChangeText={onChangeSearch}
          value={searchQuery}
          className="mb-4"
        />
        <FlashList
          data={jobCategories}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCategory === item ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedCategory === item ? "text-white" : "text-gray-800"
                } font-semibold`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          estimatedItemSize={20}
          contentContainerStyle={{ paddingHorizontal: 4 }} // Only padding here
        />
      </View>
      <View className="flex-1 pt-4  ">
        <FlashList
          data={mockJobs}
          renderItem={({ item }) => <JobItem data={item} type="large" />}
          estimatedItemSize={20}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
