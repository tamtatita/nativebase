/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { IconButton } from "../../../components/ui";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import PreviewFilePDF from "../../../components/ui/PreviewFilePDF";
import {
  addListItemService,
  deleteListItemService,
  getItemsService,
  sendEmailService,
  updateListItemService,
} from "../../../utils/services";
import lists from "../../../utils/lists";
import { removeGuidFromFileName } from "../../../utils/helpers";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useToast } from "../../../hooks/useToast";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { JOBAPPLICATIONSTATUS } from "@/constants";
import { USERTYPES } from "@/constants";
import { useAuth } from "../../../components/providers/AuthProvider";
import { height } from "@/lib/InfoDevice";
import { FlashList } from "@shopify/flash-list";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import config from "../../../utils/config";

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
  const [loading, setLoading] = useState(false);
  const connRef = useRef(null); // Dùng useRef để lưu conn
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

  const handleAccpectJob = async () => {
    setLoading(true);
    showToast({
      message: "Accepting job application...",
      type: "loading",
    });
    try {
      if (currentCandidate.Email) {
        sendEmailService({
          ToEmails: currentCandidate.Email,
          Subject: "Job acceptance notification",
          Body: `Congratulations.Your job application for the position of ${jobApplicationForm?.Jobs?.JobTitle?.Title} has been accepted by recruiter ${currentUser.fullName}. Please check on the app for more details.`,
          IsTest: false,
          RefId: jobApplicationForm?.Id?.toString(),
          DataSource: lists.JobApplications.listName,
        });
      }
      let [messageBox, newMessage] = await Promise.all([
        getItemsService(lists.MessageBox, {
          filter: `RecruiterId eq ${currentUser.id} and CandidateId eq ${currentCandidate.Id}`,
        }).then((res) => res.value[0]),
        addListItemService(lists.Messages, {
          Message: `${currentUser.fullName} has accepted job application for the position of ${jobApplicationForm?.Jobs?.JobTitle?.Title}.`,
          RecruiterId: currentUser.id,
          CandidateId: currentCandidate.Id,
          SenderId: currentUser.id,
          JobApplicationId: jobApplicationForm.Id,
          JobId: jobApplicationForm.JobId,
          IsSystemMessage: true,
        }),
        updateListItemService(lists.JobApplications, jobApplicationForm.Id, {
          Status: JOBAPPLICATIONSTATUS.Accepted,
        }),
      ]);

      if (!messageBox) {
        messageBox = await addListItemService(lists.MessageBox, {
          CandidateId: currentCandidate.Id,
          RecruiterId: currentUser.id,
          LastMessageId: newMessage.Id,
        });
      } else {
        await updateListItemService(lists.MessageBox, messageBox.Id, {
          LastMessageId: newMessage?.Id,
        });
      }
      connRef.current.invoke("SendMessage", {
        NewMessageId: newMessage.Id,
        CandidateId: newMessage.CandidateId,
        RecruiterId: newMessage.RecruiterId,
        SenderId: newMessage.SenderId,
        MessageBoxId: messageBox?.Id,
      });
      showToast({
        message: "Job application accepted successfully",
        type: "success",
        timeClose: 3000,
      });
      router.back();
    } catch (error) {
      console.log("Error accpect job application", error);
      showToast({
        message: "Error occurred",
        type: "error",
        timeClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRejectJob = async () => {
    setLoading(true);
    showToast({
      message: "Reject job application...",
      type: "loading",
    });
    try {
      if (currentCandidate.Email) {
        sendEmailService({
          ToEmails: currentCandidate.Email,
          Subject: "Job Application Rejected",
          Body: `We regret to inform you that your job application for the position of ${jobApplicationForm?.Jobs?.JobTitle?.Title} has been rejected by recruiter ${currentUser.fullName}. Please check on the app for more details.`,
          IsTest: false,
          RefId: jobApplicationForm?.Id?.toString(),
          DataSource: lists.JobApplications.listName,
        });
      }
      await updateListItemService(
        lists.JobApplications,
        jobApplicationForm.Id,
        {
          Status: JOBAPPLICATIONSTATUS.Rejected,
        }
      );

      showToast({
        message: "Job application rejected successfully",
        type: "success",
        timeClose: 3000,
      });
      router.back();
    } catch (error) {
      console.log("Error reject job application", error);
      showToast({
        message: "Error occurred",
        type: "error",
        timeClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const init = async (UserId, JobId) => {
    setLoading(true);
    showToast({
      message: "Loading...",
      type: "loading",
    });
    try {
      const conn = new HubConnectionBuilder()
        .withUrl(`${config.BASE_URL}/chatHub`)
        .configureLogging(LogLevel.Information)
        .build();
      const [storeRecords, loccurrentCandidate, jobApplicationForm] =
        await Promise.all([
          getItemsService(lists.StoreRecords, {
            filter: `RefID eq ${UserId} and DataSource eq '${lists.Users.listName}' and contains(ServerRelativeUrl, '/DocumentStore') and IsFolder eq false`,
          }),
          getItemsService(lists.Users, {
            filter: `Id eq ${UserId}`,
            expand: "JobType,JobTitle,Experience,WorkingModel",
          }).then((res) => res.value[0]),
          getItemsService(lists.JobApplications, {
            filter: `JobId eq ${JobId} and UserId eq ${UserId}`,
            expand: "CV,Jobs($expand=JobTitle)",
          }).then((res) => res.value[0]),
          conn.start(),
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
      connRef.current = conn;
      if (jobApplicationForm?.CVId) {
        setSelectedCV(jobApplicationForm?.CV || {});
      } else {
        setSelectedCV(storeRecords?.value[0] || {});
      }
    } catch (error) {
      console.log("Error init JobApplicationForm", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = async () => {
    try {
      if (connRef.current) {
        await connRef.current.stop();
        console.log("Connection stopped successfully.");
      } else {
        console.log("No active connection to stop.");
      }
    } catch (error) {
      console.error("Error stopping connection: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const { UserId, JobId } = params;
      init(UserId, JobId);
      setIsSubmmited(false);
      return () => {
        handleBack();
      };
    }, [])
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-white flex flex-col ">
        <View
          style={{
            height: height - 40,
            flex: 1,
            padding: 20,
          }}
        >
          <FlashList
            contentContainerStyle={{}}
            estimatedItemSize={1}
            ListHeaderComponent={() => {
              return (
                <>
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
                        defaultValue={description}
                        onEndEditing={(e) => setDescription(e.nativeEvent.text)}
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
                                selectedCV.Id === cv.Id
                                  ? Colors.primary
                                  : "transparent"
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
                </>
              );
            }}
          />
        </View>
        {currentUser?.userType === USERTYPES.Recruiter ||
        jobApplicationForm?.Status !== JOBAPPLICATIONSTATUS.Pending ? null : (
          <View className="flex flex-row gap-2  bg-white p-2">
            {!jobApplicationForm?.Id ? (
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                className={`bg-primary py-3 rounded-lg items-center my-2 flex-1 flex flex-row justify-center ${
                  loading ? "opacity-50" : null
                }`}
              >
                <FontAwesome name="send" color="white" size={20} />
                <Text className="text-white font-bold text-lg ml-2">
                  Apply Job
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={loading}
                className={`bg-red-600 py-3 rounded-lg items-center my-2 flex-1 flex flex-row justify-center ${
                  loading ? "opacity-50" : null
                }`}
                onPress={() => setIsShowDeleteModal(true)}
              >
                <Ionicons name="close-outline" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {currentUser?.id === jobApplicationForm?.Jobs?.RecruiterId &&
        jobApplicationForm?.Status === JOBAPPLICATIONSTATUS.Pending ? (
          <View className="flex flex-row gap-2  bg-white p-2">
            <TouchableOpacity
              disabled={loading}
              className={`flex-1 flex flex-row justify-center rounded-lg items-center py-2 my-2 bg-red-600 ${
                loading ? "opacity-50" : ""
              } `}
              onPress={() => handleRejectJob()}
            >
              <Ionicons name="close-circle-outline" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                Rejected
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              className={`flex-1 flex flex-row justify-center rounded-lg items-center py-2 my-2 bg-green-600 ${
                loading ? "opacity-50" : ""
              } `}
              onPress={() => handleAccpectJob()}
            >
              <Ionicons name="checkmark" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Accpect</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
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
