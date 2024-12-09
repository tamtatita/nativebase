import { View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { Button } from "@/components/ui";

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
  useFocusEffect(
    useCallback(() => {
      if (!slug) return;
      dispatch(handleGetJobDetail({ Id: slug }));
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
          <Button
            onPress={() =>
              router.push("/(auth)/jobapplicationform/?UserId=1004&&JobId=1")
            }
            type="full"
            title="Apply for Job"
          />
        </View>
      )}
    </View>
  );
};

export default JobDetail;
