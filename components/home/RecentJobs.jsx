import { FlatList, Text, View } from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { CategoryItem, JobItem } from "@/components";
import { useFocusEffect } from "expo-router";
import { getItemsService } from "@/utils/services";
import lists from "@/utils/lists";
import { useAuth } from "../providers/AuthProvider";
import { CRITERIATYPES } from "@/constants";

export const convertDataToJobItem = (data) => {
  return {
    id: data?.Id,
    title: data?.JobTitle?.Title,
    company: data?.Recruiter?.Title,
    image_company: data?.Recruiter?.ImageUrl,
    location: data?.Locations || "N/A",
    salary: [data?.MinSalary, data?.MaxSalary],
    type: [
      data?.JobType?.Title,
      data?.Experience?.Title,
      data?.WorkingModel?.Title,
    ],
    applicantsView: data["JobApplications@odata.count"],
    bookmark: data.Bookmarks[0],
    ...data,
  };
};
const allSelected = { Id: -1, Title: "All" };
function RecentJobs() {
  const [selectedCriteria, setSelectedCriteria] = useState(allSelected);
  const [jobs, setJobs] = useState([]);
  const [criterias, setCriterias] = useState([]);
  const [loading, setLoading] = useState(false);

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const handleOnPressCriteria = useCallback((data) => {
    setSelectedCriteria(data);
    handleGetRecentJobs(data);
  }, []);

  const handleGetRecentJobs = useCallback(async (selectedCriteria) => {
    setLoading(true);
    try {
      let filter = "";
      if (selectedCriteria?.Id !== -1) {
        filter = `JobTitleId eq ${selectedCriteria?.Id} `;
      }

      const jobsResp = await getItemsService(lists.Jobs, {
        filter,
        expand: `WorkingModel,JobType,Experience,JobTitle,Recruiter,Bookmarks($filter=UserId eq ${currentUser?.id}),JobApplications($count=true)`,
      });
      // console.log(jobsResp.value);
      setJobs(jobsResp.value);
      return jobsResp;
    } catch (error) {
      console.log("handleGetRecentJobs -> error", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
      handleGetRecentJobs(allSelected);
      handleGetCriterias();
      setSelectedCriteria(allSelected);

      return () => {
        setSelectedCriteria(allSelected);
        setJobs([]);
        setCriterias([]);
      };
    }, [])
  );

  return (
    <View className="mt-4">
      {/* Title */}
      <View className="flex flex-row items-center justify-between m-5">
        <Text className="font-bold text-xl text-slate-700">Recent Jobs</Text>
      </View>

      {/* Category */}
      {criterias.length > 0 && (
        <View className="ml-5">
          <FlatList
            data={criterias}
            renderItem={({ item }) => (
              <CategoryItem
                data={item}
                selectedCriteria={selectedCriteria}
                handleOnPressCriteria={handleOnPressCriteria}
              />
            )}
            keyExtractor={(item) => item.Id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      <View className="ml-5 mt-5 h-100">
        <FlatList
          data={jobs}
          renderItem={({ item }) => {
            const jobItem = convertDataToJobItem(item);
            return <JobItem data={jobItem} type="large" />;
          }}
          keyExtractor={(item) => item.Id.toString()}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
}

export default memo(RecentJobs);
