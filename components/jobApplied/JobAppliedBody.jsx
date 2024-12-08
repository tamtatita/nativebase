import { Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { JobItem } from "@/components";
import { getItemsService } from "@/utils/services";
import lists from "../../utils/lists";
import { useAuth } from "../providers/AuthProvider";
import { useFocusEffect } from "expo-router";

const convertAppliedToJob = (data) => {
  return {
    id: data?.JobId,
    title: data?.Jobs?.JobTitle?.Title,
    image_company: data?.Jobs?.Recruiter?.ImageUrl,
    location: data?.Jobs?.Locations || "N/A",
    salary: [data?.Jobs?.MinSalary, data?.Jobs?.MaxSalary],
    type: [
      data?.Jobs?.JobType?.Title,
      data?.Jobs?.Experience?.Title,
      data?.Jobs?.WorkingModel?.Title,
    ],
    applicantsView: data?.Jobs?.["JobApplications@odata.count"],
    company: data?.Jobs?.Recruiter?.FullName,
    bookmark: {},
    status: data?.Status,
    ...data,
  };
};

const STATUS = ["All", "Sent", "Accepted", "Rejected", "Pending"];

function JobAppliedBody() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const handletGetAppliedJobs = useCallback(
    async (status) => {
      try {
        let filter = `UserId eq ${currentUser?.id}`;
        if (status && status !== "All") {
          filter += ` and Status eq '${status}'`;
        }
        const jobsResp = await getItemsService(lists.JobApplications, {
          filter,
          expand: `Jobs($expand=WorkingModel,JobType,Experience,JobTitle,Recruiter,JobApplications($count=true))`,
          orderBy: "Created desc",
          top: 15,
        });
        setAppliedJobs(jobsResp.value);
        return jobsResp;
      } catch (error) {
        console.log("handletGetAppliedJobs -> error", error);
      }
    },
    [currentUser?.id]
  );

  useFocusEffect(
    useCallback(() => {
      handletGetAppliedJobs("All");
      setSelectedStatus("All");
      return () => {
        setAppliedJobs([]);
        setSelectedStatus(null);
      };
    }, [handletGetAppliedJobs])
  );

  return (
    <View className="flex flex-col">
      <View className="ml-5">
        <FlashList
          data={STATUS}
          extraData={selectedStatus}
          keyExtractor={(item) => item}
          estimatedItemSize={1}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={async () => {
                setSelectedStatus(item);
                await handletGetAppliedJobs(item);
              }}
              className={`mr-2 px-4 py-2 rounded-full  ${
                selectedStatus === item ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedStatus === item ? "text-white" : "text-gray-800"
                } font-semibold`}
              >
                {item} {/* Đảm bảo item nằm trong component <Text> */}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
      <View className="p-5">
        <FlashList
          estimatedItemSize={4}
          data={appliedJobs}
          keyExtractor={(item) => item.Id.toString()}
          extraData={selectedStatus}
          renderItem={({ item }) => {
            const jobItem = convertAppliedToJob(item);
            return <JobItem data={jobItem} type="applied" />;
          }}
        />
      </View>
    </View>
  );
}

export default memo(JobAppliedBody);
