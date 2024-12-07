import React, { useCallback, useMemo, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Searchbar } from "react-native-paper";
import { JobItem } from "@/components";
import { getItemsService } from "@/utils/services";
import { CRITERIATYPES } from "@/constants";
import lists from "./../../utils/lists";
import { useFocusEffect } from "expo-router";
import { useAuth } from "./../../components/providers/AuthProvider";
import { debounce } from "lodash";

const allSelected = { Id: -1, Title: "All" };

const convertBookmarkToJob = (data) => {
  return {
    id: data?.JobId,
    title: data?.Job?.JobTitle?.Title,
    image_company: data?.Job?.Recruiter?.ImageUrl,
    location: data?.Job?.Locations || "N/A",
    salary: [data?.Job?.MinSalary, data?.Job?.MaxSalary],
    type: [
      data?.Job?.JobType?.Title,
      data?.Job?.Experience?.Title,
      data?.Job?.WorkingModel?.Title,
    ],
    applicantsView: data?.Job?.["JobApplications@odata.count"],
    company: data?.Job?.Recruiter?.FullName,
    bookmark: data,
    ...data,
  };
};

export default function BookMark() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState(allSelected);
  const [bookmarks, setBookmarks] = useState([]);
  const [criterias, setCriterias] = useState([]);

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);
  const onChangeSearch = debounce((query) => {
    handletGetBookmarks(selectedCriteria, query);
    setSearchQuery(query);
  }, 500);

  const handletGetBookmarks = useCallback(
    async (selectedCriteria, searchText) => {
      try {
        const conditions = [];
        if (selectedCriteria?.Id !== -1) {
          conditions.push(`Job/JobTitleId eq ${selectedCriteria?.Id}`);
        }

        if (searchText) {
          conditions.push(
            `(contains(Job/Locations, '${searchText}') or contains(Job/Recruiter/FullName, '${searchText}'))`
          );
        }
        conditions.push(`UserId eq ${currentUser?.id}`);
        let filter = conditions.join(" and ");
        const jobsResp = await getItemsService(lists.Bookmarks, {
          filter,
          expand: `Job($expand=WorkingModel,JobType,Experience,JobTitle,Recruiter,JobApplications($count=true))`,
          orderBy: "Created desc",
          top: 15,
        });
        setBookmarks(jobsResp.value);
        return jobsResp;
      } catch (error) {
        console.log("handletGetBookmarks -> error", error);
      }
    },
    [currentUser?.id]
  );

  const handleGetCriterias = useCallback(async () => {
    const criteriasResp = await getItemsService(lists.Criterias, {
      filter: `CriteriaType eq '${CRITERIATYPES.JOBTITLE}'`,
    }).then((res) => {
      return res.value;
    });
    setCriterias([allSelected, ...criteriasResp]);
    return criteriasResp;
  }, []);

  useFocusEffect(
    useCallback(() => {
      handletGetBookmarks(allSelected);
      handleGetCriterias();
      setSelectedCriteria(allSelected);

      return () => {
        setSelectedCriteria(allSelected);
        setBookmarks([]);
        setCriterias([]);
      };
    }, [handletGetBookmarks, handleGetCriterias])
  );

  return (
    <SafeAreaView className="flex-1 flex flex-col  bg-gray-100">
      <View className="px-4 py-2 ">
        <View className="flex-row items-center justify-center mb-4">
          <Text className="text-xl font-bold">Bookmarks</Text>
        </View>
        <Searchbar
          placeholder="Search jobs"
          onChangeText={onChangeSearch}
          defaultValue={searchQuery}
          className="mb-4"
        />
        <View className=" mb-2 ">
          <FlashList
            data={criterias}
            extraData={selectedCriteria}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={async () => {
                  setSelectedCriteria(item);
                  await handletGetBookmarks(item);
                }}
                className={`mr-2 px-4 py-2 rounded-full ${
                  selectedCriteria?.Id === item?.Id
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              >
                <Text
                  className={`${
                    selectedCriteria?.Id === item?.Id
                      ? "text-white"
                      : "text-gray-800"
                  } font-semibold`}
                >
                  {item?.Title} {/* Đảm bảo item nằm trong component <Text> */}
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            estimatedItemSize={20}
          />
        </View>
      </View>

      <View className="flex-1 px-4 min-h-[2px]">
        <FlashList
          data={bookmarks}
          renderItem={({ item }) => {
            const jobItem = convertBookmarkToJob(item);
            return <JobItem data={jobItem} type="large" />;
          }}
          estimatedItemSize={20}
          keyExtractor={(item) => item.Id.toString()}
          extraData={(selectedCriteria, searchQuery, bookmarks)}
        />
      </View>
    </SafeAreaView>
  );
}
