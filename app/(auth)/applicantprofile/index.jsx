import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native";
import { IconButton } from "@/components/ui";

import { Dropdown } from "react-native-element-dropdown";
import AttachFile from "../../../components/ui/AttachFile";
import lists from "../../../utils/lists";
import ImageUploader from "./../../../components/ui/ImageUploader";

import { router, useFocusEffect } from "expo-router";
import { useAuth } from "./../../../components/providers/AuthProvider";
import { useToast } from "./../../../hooks/useToast";
import {
  getItemsService,
  updateListItemService,
} from "../../../utils/services";
import { CRITERIATYPES } from "../../../constants";
import { toCamelCaseKey } from "../../../utils/helpers";
// Mock data for radio button groups

const genders = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

const ApplicantProfile = () => {
  //Master state
  const [workingModels, setWorkingModels] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);

  // Form state
  const [name, setName] = useState("Esther Howard");
  const [phone, setPhone] = useState("603.555.0123");
  const [email, setEmail] = useState("example@gmail.com");
  const [gender, setGender] = useState("");
  const [storeRecords, setStoreRecords] = useState([]);

  // Radio button states
  const [selectedWorkingModel, setSelectedWorkingModel] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { profile, setProfile } = useAuth();
  const { showToast } = useToast();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  // Error handling
  const showError = (field) => isSubmitted && (!field || field?.length === 0);

  // Radio button group component
  const RadioGroup = ({
    field,
    title,
    options,
    selected,
    onSelect,
    required,
  }) => (
    <View className="mb-2">
      <Text className="mb-2">
        {title} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <View className="flex-row flex-wrap mb-1">
        {options.map((option) => (
          <TouchableOpacity
            key={option?.Id}
            onPress={() => onSelect(option)}
            className={`mr-2 mb-2 py-2 px-3 rounded-full ${
              selected?.Id === option?.Id ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <Text
              className={`${
                selected?.Id === option?.Id ? "text-white" : "text-gray-800"
              }`}
            >
              {option.Title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showError(field) && (
        <Text className="text-red-500">{title} is required</Text>
      )}
    </View>
  );

  const handleValidate = () => {
    if (
      !name ||
      !phone ||
      !email ||
      !gender ||
      !selectedWorkingModel?.Id ||
      !selectedJobType?.Id ||
      !selectedExperience?.Id ||
      !selectedJobTitle?.Id ||
      storeRecords?.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    // Validate and update logic here
    try {
      setIsSubmitted(true);
      const isSuccess = handleValidate();
      if (!isSuccess) {
        showToast({
          message: "Please fill in all required fields",
          type: "error",
        });
        return;
      }
      const updateData = {
        FullName: name,
        Phone: phone,
        Email: email,
        Gender: gender,
        WorkingModelId: selectedWorkingModel?.Id || null,
        JobTypeId: selectedJobType?.Id || null,
        ExperienceId: selectedExperience?.Id || null,
        JobTitleId: selectedJobTitle?.Id || null,
        IsInputInformation: true,
      };
      await updateListItemService(lists.Users, currentUser?.id, updateData);
      showToast({
        message: "Profile updated successfully",
        type: "success",
        timeClose: 2000,
      });
      const newUser = {
        ...currentUser,
        ...updateData,
      };
      setProfile({
        ...profile,
        user: toCamelCaseKey(newUser),
      });
      router.push("/(tabs)");
    } catch (error) {
      console.log("Error updating profile", error);
      showToast({
        message: "Error updating profile",
        type: "error",
        timeClose: 2000,
      });
    }
  };

  const setInformation = useCallback(() => {
    setName(currentUser?.fullName);
    setPhone(currentUser?.phone);
    setEmail(currentUser?.email);
    setGender(currentUser?.gender);
    setSelectedWorkingModel({ Id: currentUser?.workingModelId });
    setSelectedJobType({ Id: currentUser?.jobTypeId });
    setSelectedExperience({ Id: currentUser?.experienceId });
    setSelectedJobTitle({ Id: currentUser?.jobTitleId });
  }, [currentUser]);

  const init = useCallback(async () => {
    const criteriasResp = await getItemsService(lists.Criterias).then(
      (res) => res.value
    );
    setWorkingModels(
      criteriasResp?.filter(
        (item) => item.CriteriaType === CRITERIATYPES.WORKINGMODEL
      )
    );
    setJobTypes(
      criteriasResp?.filter(
        (item) => item.CriteriaType === CRITERIATYPES.JOBTYPE
      )
    );
    setExperienceLevels(
      criteriasResp?.filter(
        (item) => item.CriteriaType === CRITERIATYPES.EXPERIENCE
      )
    );
    setJobTitles(
      criteriasResp?.filter(
        (item) => item.CriteriaType === CRITERIATYPES.JOBTITLE
      )
    );
  }, []);

  useFocusEffect(useCallback(() => setInformation(), []));
  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <IconButton type="back" />
          <Text className="text-xl font-semibold ml-4">
            Personal Information
          </Text>
        </View>
        <View className="p-4">
          {/* Profile Picture */}
          <View className="items-center mb-6 ">
            <View>
              <ImageUploader
                dataSource={lists.Users}
                refId={currentUser?.id}
                imageUrlColumn="ImageUrl"
                allowEdit
              />
            </View>
          </View>

          {/* Form Fields */}
          <View className="space-y-4 ">
            {/* Basic Information */}
            <View>
              <Text className="mb-2">
                Name <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className="bg-gray-50 rounded-lg p-2"
              />
              {showError(name) && (
                <Text className="text-red-500">Name is required</Text>
              )}
            </View>

            <View>
              <Text className="mb-2">
                Phone Number <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  className="flex-1 bg-gray-50 rounded-lg p-2"
                />
                {showError(phone) && (
                  <Text className="text-red-500">Phone number is required</Text>
                )}
              </View>
            </View>

            <View className="mb-2">
              <Text className="mb-2">
                Email <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                className="bg-gray-50 rounded-lg p-2"
              />
              {showError(email) && (
                <Text className="text-red-500">Email is required</Text>
              )}
            </View>

            <View className="mb-2">
              <Text className="mb-2">
                Gender: <Text className="text-red-500">*</Text>
              </Text>
              <Dropdown
                className="mb-2 border border-gray-300 rounded-lg p-4"
                // style={[styles.dropdown]}

                data={genders}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={gender}
                onChange={(item) => {
                  setGender(item.gender);
                }}
              />
            </View>

            {/* Radio Button Groups */}
            <RadioGroup
              title="Working Model"
              options={workingModels}
              selected={selectedWorkingModel}
              onSelect={setSelectedWorkingModel}
              required
              field={selectedWorkingModel}
            />

            <RadioGroup
              title="Job Type"
              options={jobTypes}
              selected={selectedJobType}
              onSelect={setSelectedJobType}
              required
              field={selectedJobType}
            />

            <RadioGroup
              title="Experience Level"
              options={experienceLevels}
              selected={selectedExperience}
              onSelect={setSelectedExperience}
              required
              field={selectedExperience}
            />

            <RadioGroup
              title="Job Title"
              options={jobTitles}
              selected={selectedJobTitle}
              onSelect={setSelectedJobTitle}
              required
              field={selectedJobTitle}
            />

            <AttachFile
              accpectType="application/pdf"
              dataSource={lists.Users.listName}
              refId={currentUser?.id}
              setStore={setStoreRecords}
            />
            {showError(storeRecords) && (
              <Text className="text-red-500">CV is required</Text>
            )}

            {/* Update Button */}
            <TouchableOpacity
              onPress={handleUpdate}
              className="bg-primary py-3 rounded-lg items-center"
            >
              <Text className="text-white font-bold text-lg">Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ApplicantProfile;
