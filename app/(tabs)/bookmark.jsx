import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Searchbar } from "react-native-paper";
import { IconButton } from "@/components/ui";
import { JobItem } from "@/components";

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

export default function BookMark() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 py-2 ">
        <View className="flex-row items-center justify-center mb-4">
          <Text className="text-xl font-bold">Bookmarks</Text>
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
                {item} {/* Đảm bảo item nằm trong component <Text> */}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          estimatedItemSize={20}
          contentContainerStyle={{ paddingHorizontal: 4, marginBottom: 16 }}
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
