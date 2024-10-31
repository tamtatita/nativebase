import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { IconButton } from "@/components/ui";

export default function JobPostForm() {
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [selectedWorkingModel, setSelectedWorkingModel] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [applicantCount, setApplicantCount] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const workingModels = ["On-Site", "Remote", "Hybrid"];
  const jobTypes = ["Full-Time", "Part-Time", "Contract"];
  const experienceLevels = ["Entry", "Mid", "Senior"];
  const jobTitles = ["Developer", "Designer", "Product Manager"];

  const handleSubmit = () => {
    setIsSubmitted(true);

    if (
      location &&
      salaryMin &&
      salaryMax &&
      selectedWorkingModel &&
      selectedJobType &&
      selectedExperienceLevel &&
      selectedJobTitle &&
      applicantCount &&
      description
    ) {
      console.log("Submit");
      setIsSubmitted(false); // Reset submit state after successful submission
    }
  };

  const showError = (field) => isSubmitted && !field;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="flex-row items-center justify-between mb-4">
          <IconButton type="back" />
          <Text className="flex-1 text-xl font-bold text-center">
            Recruitment List
          </Text>
        </View>

        {/* Location Input */}
        <Text className="mb-2">
          Location <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
          className=" bg-gray-200"
        />
        {showError(location) && (
          <Text className="text-red-500 mb-4">Location is required</Text>
        )}

        {/* Salary Input */}
        <Text className="mb-2">
          Salary Range <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row justify-between mb-1">
          <TextInput
            placeholder="Min"
            value={salaryMin}
            onChangeText={setSalaryMin}
            keyboardType="numeric"
            className="border-b border-gray-300  flex-1 mr-2"
          />
          <TextInput
            placeholder="Max"
            value={salaryMax}
            onChangeText={setSalaryMax}
            keyboardType="numeric"
            className="border-b border-gray-300  flex-1"
          />
        </View>
        {showError(salaryMin) && (
          <Text className="text-red-500 mb-1">Minimum salary is required</Text>
        )}
        {showError(salaryMax) && (
          <Text className="text-red-500 mb-4">Maximum salary is required</Text>
        )}

        {/* Working Model */}
        <Text className="mb-2">
          Working Model <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row mb-1">
          {workingModels.map((model) => (
            <TouchableOpacity
              key={model}
              onPress={() => setSelectedWorkingModel(model)}
              className={`mr-2 py-1 px-3 rounded-full ${
                selectedWorkingModel === model ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedWorkingModel === model ? "text-white" : "text-black"
                }`}
              >
                {model}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {showError(selectedWorkingModel) && (
          <Text className="text-red-500 mb-4">Working model is required</Text>
        )}

        {/* Job Type */}
        <Text className="mb-2">
          Job Type <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row mb-1">
          {jobTypes.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedJobType(type)}
              className={`mr-2 py-1 px-3 rounded-full ${
                selectedJobType === type ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedJobType === type ? "text-white" : "text-black"
                }`}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {showError(selectedJobType) && (
          <Text className="text-red-500 mb-4">Job type is required</Text>
        )}

        {/* Experience Level */}
        <Text className="mb-2">
          Level of Experience <Text className="text-red-500">*</Text>
        </Text>
        <View className="flex-row mb-1">
          {experienceLevels.map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setSelectedExperienceLevel(level)}
              className={`mr-2 py-1 px-3 rounded-full ${
                selectedExperienceLevel === level
                  ? "bg-blue-500"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedExperienceLevel === level
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {showError(selectedExperienceLevel) && (
          <Text className="text-red-500 mb-4">
            Experience level is required
          </Text>
        )}

        {/* Job Title */}
        <Text className="mb-2">
          Job Title <Text className="text-red-500">*</Text>
        </Text>
        {jobTitles.map((title) => (
          <View key={title} className="flex-row items-center mb-1">
            <RadioButton
              value={title}
              status={selectedJobTitle === title ? "checked" : "unchecked"}
              onPress={() => setSelectedJobTitle(title)}
            />
            <Text>{title}</Text>
          </View>
        ))}
        {showError(selectedJobTitle) && (
          <Text className="text-red-500 mb-4">Job title is required</Text>
        )}

        {/* Applicant Count */}
        <Text className="mb-2">
          Applicant Count <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          placeholder="Enter count"
          value={applicantCount}
          onChangeText={setApplicantCount}
          keyboardType="numeric"
          className="border-b border-gray-300  mb-1"
        />
        {showError(applicantCount) && (
          <Text className="text-red-500 mb-4">Applicant count is required</Text>
        )}

        {/* Description */}
        <Text className="mb-2">
          Description <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          placeholder="Enter job description"
          value={description}
          onChangeText={setDescription}
          multiline
          className="border border-gray-300 p-3 mb-1 h-24"
        />
        {showError(description) && (
          <Text className="text-red-500 mb-4">Description is required</Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-500 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-bold text-lg">Post Job</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
