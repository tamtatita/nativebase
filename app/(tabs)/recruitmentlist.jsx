import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Searchbar } from "react-native-paper";
import { IconButton } from "@/components/ui";
import { JobItem } from "@/components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { getItemsService } from "../../utils/services";
import lists from "../../utils/lists";
import { useAuth } from "../../components/providers/AuthProvider";
const jobCategories = ["All", "Accountant", "BDM", "Content"];

const convertDataToJobItem = (data) => {
  return {
    id: data?.Id,
    title: data?.JobTitle?.Title,
    image_company: data?.Recruiter?.ImageUrl,
    location: data?.Recruiter?.CompanyLocation || "N/A",
    salary: [data?.MinSalary, data?.MaxSalary],
    deadline: data?.Deadline,
    isActive: data?.IsActive,
    type: [
      data?.JobTitle?.Title,
      data?.JobType?.Title,
      data?.Experience?.Title,
      data?.WorkingModel?.Title,
    ],
    applicantsView: data["JobApplications@odata.count"],
    company: data?.Recruiter?.FullName,
    ...data,
  };
};

export default function RecruitmentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [dataJobs, setDataJobs] = useState([]);
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleGetJobsForRecruiter = async () => {
    const response = await getItemsService(lists.Jobs, {
      filter: `RecruiterId eq ${currentUser?.id} `,
      expand: `WorkingModel,JobType,Experience,JobTitle,Recruiter`,
      orderBy: "Created desc",
      // top: 1,
    });
    setDataJobs(response?.value);
  };

  useEffect(() => {
    handleGetJobsForRecruiter();
  }, [loading]);

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
          contentContainerStyle={{ paddingHorizontal: 4 }}
        />
      </View>
      <View className="flex-1 pt-4  ">
        <FlashList
          data={dataJobs}
          renderItem={({ item }) => {
            const job = convertDataToJobItem(item);
            return (
              <JobItem
                loading={loading}
                setLoading={setLoading}
                data={job}
                type="large"
                isHR={true}
              />
            );
          }}
          estimatedItemSize={20}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
