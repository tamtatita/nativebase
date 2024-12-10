import { FlatList, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { JobItem } from "@/components";
import { useAuth } from "../providers/AuthProvider";
import { useFocusEffect } from "expo-router";
import lists from "@/utils/lists";
import { getItemsService } from "@/utils/services";
import { convertDataToJobItem } from "./RecentJobs";
import dayjs from "dayjs";

function SuggestedJob() {
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);
  const init = useCallback(async () => {
    let conditions = [];
    if (currentUser?.jobTypeId) {
      conditions.push(`JobTypeId eq ${currentUser?.jobTypeId}`);
    }
    if (currentUser?.experienceId) {
      conditions.push(`ExperienceId eq ${currentUser?.experienceId}`);
    }
    if (currentUser?.workingModelId) {
      conditions.push(`WorkingModelId eq ${currentUser?.workingModelId}`);
    }
    let filter = ` (DeadLine ge ${dayjs().toISOString()}) and (${conditions.join(
      " or "
    )})`;
    if (currentUser?.jobTitleId) {
      filter += ` and (JobTitleId eq ${currentUser?.jobTitleId})`;
    }

    const suggestedJobsResp = await getItemsService(lists.Jobs, {
      filter,
      orderBy: "Created desc",
      top: 15,
      expand: `WorkingModel,JobType,Experience,JobTitle,Recruiter,Bookmarks($filter=UserId eq ${currentUser?.id}),JobApplications($count=true)`,
    });
    setSuggestedJobs(suggestedJobsResp.value);
  }, []);

  useFocusEffect(
    useCallback(() => {
      init();
      return () => {
        setSuggestedJobs([]);
      };
    }, [])
  );
  return (
    <View style={{ height: "inheric" }}>
      {/* Title */}
      <View className="flex p-5 flex-row items-center justify-between">
        <Text className="font-bold text-xl text-slate-700">Suggested Jobs</Text>
      </View>

      {/* List Jobs */}
      <View className="w-full ml-5">
        <FlatList
          data={suggestedJobs}
          renderItem={({ item }) => {
            const jobItem = convertDataToJobItem(item);
            return <JobItem data={jobItem} type="large" />;
          }}
          estimatedItemSize={3}
          keyExtractor={(item) => item.Id.toString()}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </View>
  );
}

export default SuggestedJob;
