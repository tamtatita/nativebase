/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { IconButton } from "../../../components/ui";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import PreviewFilePDF from "../../../components/ui/PreviewFilePDF";
import {
  addListItemService,
  deleteListItemService,
  getItemsService,
} from "../../../utils/services";
import lists from "../../../utils/lists";
import { removeGuidFromFileName } from "../../../utils/helpers";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useToast } from "../../../hooks/useToast";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { JOBAPPLICATIONSTATUS } from "@/constants";
import { USERTYPES } from "@/constants";
import { useAuth } from "../../../components/providers/AuthProvider";

const JobApplicationForm = () => {
  // Dữ liệu mặc định của ứng viên từ tài khoản đăng nhập

  // State cho thông tin mô tả và CV chọn
  const [description, setDescription] = useState("");
  const [selectedCV, setSelectedCV] = useState({});
  const [currentCandidate, setCurrentCandidate] = useState({});
  const [isSubmmited, setIsSubmmited] = useState(false);
  const [storeRecords, setStoreRecords] = useState([]);
  const [jobTags, setJobTags] = useState([]);
  const [jobApplicationForm, setJobApplicationForm] = useState({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const params = useLocalSearchParams();
  const { showToast } = useToast();

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const handleCVView = (cvFile) => {
    setSelectedPreviewFile(cvFile);
    setIsPreviewVisible(true);
  };

  const handleSubmit = async () => {
    setIsSubmmited(true);
    if (!selectedCV.Id) {
      showToast({
        message: "Please select a CV to apply",
        type: "error",
        timeClose: 3000,
      });
      return;
    }
    try {
      // Submit thông tin apply

      await addListItemService(lists.JobApplications, {
        JobId: params.JobId,
        UserId: currentCandidate.Id,
        Description: description,
        CVId: selectedCV.Id,
        Status: JOBAPPLICATIONSTATUS.Pending,
      });
      showToast({
        message: "Job application submitted successfully",
        type: "success",
        timeClose: 3000,
      });
      router.back();
    } catch (error) {
      console.log("Error submit job application", error);
      showToast({
        message: "Error occurred",
        type: "error",
        timeClose: 3000,
      });
    }
  };

  const handleCancelJob = async () => {
    try {
      await deleteListItemService(lists.JobApplications, jobApplicationForm.Id);
      showToast({
        message: "Job application canceled successfully",
        type: "success",
        timeClose: 3000,
      });
      router.back();
    } catch (error) {
      console.log("Error cancel job application", error);
      showToast({
        message: "Error occurred",
        type: "error",
        timeClose: 3000,
      });
    }
  };

  const init = async (UserId, JobId) => {
    try {
      const [storeRecords, loccurrentCandidate, jobApplicationForm] =
        await Promise.all([
          getItemsService(lists.StoreRecords, {
            filter: `RefID eq ${UserId} and DataSource eq '${lists.Users.listName}'`,
          }),
          getItemsService(lists.Users, {
            filter: `Id eq ${UserId}`,
            expand: "JobType,JobTitle,Experience,WorkingModel",
          }).then((res) => res.value[0]),
          getItemsService(lists.JobApplications, {
            filter: `JobId eq ${JobId} and UserId eq ${UserId}`,
            expand: "CV",
          }).then((res) => res.value[0]),
        ]);
      let newStoreRecords = storeRecords.value;
      if (currentUser?.userType === USERTYPES.Recruiter) {
        newStoreRecords = storeRecords.value.filter(
          (item) => item.Id === jobApplicationForm.CVId
        );
      }
      setStoreRecords(newStoreRecords);
      setCurrentCandidate(loccurrentCandidate);
      setJobTags([
        loccurrentCandidate?.JobType?.Title,
        loccurrentCandidate?.JobTitle?.Title,
        loccurrentCandidate?.Experience?.Title,
        loccurrentCandidate?.WorkingModel?.Title,
      ]);
      setJobApplicationForm(jobApplicationForm);
      setDescription(jobApplicationForm?.Description || "");
      if (jobApplicationForm?.CVId) {
        setSelectedCV(jobApplicationForm?.CV || {});
      } else {
        setSelectedCV(storeRecords?.value[0] || {});
      }
    } catch (error) {
      console.log("Error init JobApplicationForm", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const { UserId, JobId } = params;
      init(UserId, JobId);
      setIsSubmmited(false);
    }, [])
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-white ">
        <ScrollView className="flex-1  px-4 mb-2">
          <View className="flex-row items-center justify-between  mb-4">
            <IconButton type="back" />
            <Text className="flex-1 text-xl font-bold text-center">
              Job Application
            </Text>
          </View>

          <View className="flex flex-1 flex-col gap-3 ">
            {/* Thông tin cá nhân */}

            <View className="border border-gray-300 shadow-sm  rounded-xl p-3">
              <View className="flex flex-row gap-2 ">
                <FontAwesome
                  name="address-book"
                  size={25}
                  color={Colors.primary}
                />
                <Text className="text-lg font-semibold text-gray-800 ">
                  Personal Information
                </Text>
              </View>
              <View className="h-[1px] bg-gray-300 my-1"></View>
              <View className="flex flex-col gap-[1px] ">
                <View className="flex flex-row gap-2">
                  <FontAwesome name="user" size={20} />
                  <Text className="text-gray-400 ">
                    {currentCandidate?.FullName}
                  </Text>
                </View>
                <View className="flex flex-row gap-2">
                  <FontAwesome name="phone" size={20} />
                  <Text className="text-gray-400">
                    {currentCandidate?.Phone || "N/A"}
                  </Text>
                </View>
                <View className="flex flex-row gap-2">
                  <FontAwesome name="map-marker" size={20} />
                  <Text className="text-gray-400 ">
                    {currentCandidate?.Location || "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            {/* About */}
            <View className="">
              <Text className="text-lg font-semibold text-gray-800 mb-4">
                About
              </Text>
              <View className="flex-row flex-wrap">
                {jobTags.map((tag) => (
                  <Text
                    key={tag}
                    className="bg-primary text-white py-1 px-3  rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </Text>
                ))}
              </View>
            </View>

            {/* Thông tin apply */}
            <View className="">
              <Text className="text-lg font-semibold text-gray-800 mb-4">
                More Information
              </Text>

              {/* Description */}
              <Text className="text-gray-600 mb-2">Description</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Tell us about yourself"
                multiline
                rows={4}
                value={description}
                onChangeText={setDescription}
              />

              {/* Chọn CV */}
              <Text className="text-gray-600 mb-2">
                CV to Apply <Text className="text-red-500">*</Text>{" "}
              </Text>
              <View>
                {storeRecords.map((cv) => (
                  <View
                    key={cv.Id}
                    className="flex flex-row items-center justify-between mb-3 gap-2"
                  >
                    <FontAwesome5
                      name="file-pdf"
                      size={20}
                      color={
                        selectedCV.Id === cv.Id ? Colors.primary : "transparent"
                      }
                    />
                    <TouchableOpacity
                      className={`flex flex-row items-center  flex-1 rounded-md p-3 bg-primary ${
                        selectedCV.Id === cv.Id ? "" : "opacity-50"
                      }`}
                      onPress={() => setSelectedCV(cv)}
                    >
                      <Text className="mr-2 text-white ">
                        {removeGuidFromFileName(cv.Name)}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCVView(cv)}>
                      <FontAwesome
                        name="eye"
                        size={20}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
                {isSubmmited && !selectedCV?.Id && (
                  <Text className="text-red-500 mb-4">
                    Please select a CV to apply
                  </Text>
                )}
              </View>
            </View>
          </View>
          {currentUser?.userType ===
          USERTYPES.Recruiter ? null : !jobApplicationForm?.Id ? (
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-primary py-3 rounded-lg items-center my-2"
            >
              <Text className="text-white font-bold text-lg">Apply Job</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-red-600 py-3 rounded-lg items-center my-2"
              onPress={() => setIsShowDeleteModal(true)}
            >
              <Text className="text-white font-bold text-lg">Cancel</Text>
            </TouchableOpacity>
          )}

          {
            // Xem trước file PDF
            isPreviewVisible && (
              <PreviewFilePDF
                handleDismiss={() => {
                  setIsPreviewVisible(false);
                  setSelectedPreviewFile(null);
                }}
                file={selectedPreviewFile}
              />
            )
          }
        </ScrollView>
      </SafeAreaView>
      <Portal>
        <Dialog
          visible={isShowDeleteModal}
          onDismiss={() => setIsShowDeleteModal(false)}
        >
          <Dialog.Title>Confirm Cancel</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to cancel?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setIsShowDeleteModal(false)}
              textColor="#6c757d"
            >
              Cancel
            </Button>
            <Button textColor="#dc3545" onPress={() => handleCancelJob()}>
              Continue
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default JobApplicationForm;
