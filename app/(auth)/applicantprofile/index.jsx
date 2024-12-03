import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { IconButton, Button } from "@/components/ui";

import { Dropdown } from "react-native-element-dropdown";
import AttachFile from "../../../components/ui/AttachFile";
import { useSelector } from "react-redux";
import { MODULE_AUTH } from "../../../store/auth";
import lists from "../../../utils/lists";
import ImageUploader from "./../../../components/ui/ImageUploader";
import useAuth from "./../../../hooks/useAuth";

// Mock data for radio button groups
const workingModels = ["Remote", "Hybrid", "On-Site"];
const jobTypes = ["Full Time", "Part Time", "Contract"];
const experienceLevels = ["Entry", "Junior", "Mid-Level", "Senior"];
const jobTitles = ["Developer", "Designer", "Manager", "Consultant"];
const genders = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const ApplicantProfile = () => {
  // Form state
  const [name, setName] = useState("Esther Howard");
  const [phone, setPhone] = useState("603.555.0123");
  const [email, setEmail] = useState("example@gmail.com");
  const [gender, setGender] = useState("");

  // Radio button states
  const [selectedWorkingModel, setSelectedWorkingModel] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  // Error handling
  const showError = (field) => isSubmitted && !field;

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
            key={option}
            onPress={() => onSelect(option)}
            className={`mr-2 mb-2 py-2 px-3 rounded-full ${
              selected === option ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <Text
              className={`${
                selected === option ? "text-white" : "text-gray-800"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showError(field) && (
        <Text className="text-red-500">{title} is required</Text>
      )}
    </View>
  );

  const handleUpdate = () => {
    // Validate and update logic here
    setIsSubmitted(true);
    console.log("Update profile");
  };

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
          <View className="items-center mb-6">
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
                className="bg-gray-50 rounded-lg"
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
                  className="flex-1 bg-gray-50 rounded-lg"
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
                className="bg-gray-50 rounded-lg"
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
              dataSource={lists.Users.listName}
              refId={currentUser?.id}
            />

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
