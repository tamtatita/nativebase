import { Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";

import { AboutPage, CompanyPage } from "@/components";
import { height } from "@/lib/InfoDevice";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import ApplicantsListPage from "../../../components/home/ApplicantsListPage";
import JobDetailHeader from "../../../components/job/JobDetailHeader";
import JobDetailContent from "../../../components/job/JobDetailContent";
import JobDetailTab from "../../../components/job/JobDetailTab";
import { useDispatch, useSelector } from "react-redux";
import { handleGetJobDetail, MODULE_JOBDETAIL } from "../../../store/jobdetail";
import { useAuth } from "../../../components/providers/AuthProvider";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";

const JobDetail = () => {
  const { selectedTab, jobDetail } = useSelector(
    (state) => state[MODULE_JOBDETAIL]
  );
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const { slug } = useLocalSearchParams();
  const dispatch = useDispatch();

  const currentJobApplication = useMemo(() => {
    return jobDetail?.JobApplications?.find(
      (item) => item.UserId === currentUser?.id
    );
  }, [jobDetail, currentUser]);

  const deadlineStatus = useMemo(() => {
    const deadline = dayjs(jobDetail?.Deadline);
    const now = dayjs();

    if (deadline.isBefore(now) || !jobDetail?.Deadline) return "Expired";
    if (deadline.diff(now, "day") <= 1) return "Urgent";
    return "Normal";
  }, [jobDetail]);

  useFocusEffect(
    useCallback(() => {
      if (!slug) return;
      dispatch(handleGetJobDetail({ Id: slug, UserId: currentUser?.id }));
    }, [slug, dispatch])
  );
  return (
    <View style={{ position: "relative", flex: 1 }}>
      <View
        style={{
          height:
            currentUser?.id !== jobDetail?.RecruiterId ? height - 100 : height,
        }}
      >
        <FlashList
          contentContainerStyle={{}}
          estimatedItemSize={1}
          ListHeaderComponent={() => {
            return (
              <>
                <JobDetailHeader />

                <View className="bg-white">
                  <JobDetailContent />

                  <JobDetailTab />
                </View>

                {/* Render nội dung dựa vào Tab */}
                <View>
                  {selectedTab === "About" && <AboutPage />}
                  {selectedTab === "Company" && <CompanyPage />}
                  {selectedTab === "Applicants" && <ApplicantsListPage />}
                </View>
              </>
            );
          }}
        />
      </View>

      {jobDetail?.RecruiterId !== currentUser?.id && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            borderTopWidth: 1,
            borderTopColor: "gray",
            borderTopLeftRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            padding: 14,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push(
                ` /(auth)/jobapplicationform/?UserId=${currentUser?.id}&&JobId=${slug}`
              );
            }}
            // disabled={loading}
            className={`bg-primary py-3 rounded-lg items-center my-2 flex-1 flex flex-row justify-center w-full ${
              !currentJobApplication?.Id && deadlineStatus === "Expired"
                ? "opacity-50"
                : null
            }`}
          >
            <FontAwesome
              name={currentJobApplication?.Id ? "edit" : "send"}
              color="white"
              size={20}
            />
            <Text className="text-white font-bold text-lg ml-2">
              {currentJobApplication?.Id ? "Update Application" : "Apply Now"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default JobDetail;
