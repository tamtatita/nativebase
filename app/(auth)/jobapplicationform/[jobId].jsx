import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { IconButton, Button } from "../../../components/ui";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Section from "../../../components/jobapplicationform/Section";
import PreviewFilePDF from "../../../components/ui/PreviewFilePDF";
import { useSelector } from "react-redux";
import { MODULE_AUTH } from "../../../store/auth";
import { getItemsService } from "../../../utils/services";
import lists from "../../../utils/lists";
import { removeGuidFromFileName } from "../../../utils/helpers";

const defaultUserData = {
  fullName: "Nguyen Van A",
  phone: "0123456789",
  location: "1234 Trần Hưng Đạo, TP.HCM",
  jobTags: ["Developer", "Full-Time", "3 Years Experience", "Remote"],
};

const JobApplicationForm = () => {
  // Dữ liệu mặc định của ứng viên từ tài khoản đăng nhập
  const { currentUser } = useSelector((state) => state[MODULE_AUTH]);
  // State cho thông tin mô tả và CV chọn
  const [description, setDescription] = useState("");
  const [selectedCV, setSelectedCV] = useState({});
  const [isSubmmited, setIsSubmmited] = useState(false);
  const [storeRecords, setStoreRecords] = useState([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState(null);

  const handleCVView = (cvFile) => {
    setSelectedPreviewFile(cvFile);
    setIsPreviewVisible(true);
  };

  const handleSubmit = () => {
    if (!selectedCV) {
      alert("Vui lòng chọn CV để apply!");
      return;
    }
    // Submit thông tin apply
    console.log({
      description,
      selectedCV,
    });
  };

  const handleGetStoreRecords = async (currentUser) => {
    const storeRecords = await getItemsService(lists.StoreRecords, {
      filter: `RefID eq ${currentUser.Id} and DataSource eq '${lists.Users.listName}'`,
    });

    setStoreRecords(storeRecords.value);
  };

  useEffect(() => {
    if (currentUser?.Id) {
      handleGetStoreRecords(currentUser);
    }
  }, [currentUser]);

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="flex-1 bg-white p-4">
        <View className="flex-row items-center justify-between  mb-4">
          <IconButton type="back" />
          <Text className="flex-1 text-xl font-bold text-center">
            Job Application
          </Text>
        </View>

        <View className="flex flex-col gap-3 ">
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
                <Text className="text-gray-400 ">{currentUser?.FullName}</Text>
              </View>
              <View className="flex flex-row gap-2">
                <FontAwesome name="phone" size={20} />
                <Text className="text-gray-400">
                  {currentUser?.Phone || "N/A"}
                </Text>
              </View>
              <View className="flex flex-row gap-2">
                <FontAwesome name="map-marker" size={20} />
                <Text className="text-gray-400 ">
                  {currentUser?.Location || "N/A"}
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
              {defaultUserData.jobTags.map((tag) => (
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
                    <FontAwesome name="eye" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              ))}
              {isSubmmited && !selectedCV && (
                <Text className="text-red-500 mb-4">
                  Please select a CV to apply
                </Text>
              )}
            </View>
          </View>

          {/* Submit button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-primary py-3 rounded-lg items-center"
          >
            <Text className="text-white font-bold text-lg">Apply Job</Text>
          </TouchableOpacity>
        </View>
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
  );
};

export default JobApplicationForm;
