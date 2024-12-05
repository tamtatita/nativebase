import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { IconButton } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";
import { Formik } from "formik";
import { Dropdown } from "react-native-element-dropdown";
import * as Yup from "yup";
import {
  getItemsService,
  updateListItemService,
} from "../../../utils/services";
import lists from "../../../utils/lists";
import { useAuth } from "../../../components/providers/AuthProvider";
import { CRITERIATYPES } from "../../../constants";
import { useFocusEffect } from "expo-router";
export default function JobPostForm() {
  const [workingModels, setWorkingModels] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);

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

  useFocusEffect(
    useCallback(() => {
      init();
    }, [])
  );

  console.log(workingModels, "workingModels");
  const { profile, setProfile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const handleSubmit = async (values) => {
    const dataSubmit = {
      ...values,
      MinSalary: parseInt(values.MinSalary),
      MaxSalary: parseInt(values.MaxSalary),
      RecruiterId: currentUser?.id,
    };
    console.log(dataSubmit, "dataSubmit");
    const a = {
      Locations: "Hồ Chí Minh",
      MinSalary: 12000000,
      MaxSalary: 13000000,
      Description: "Develop and maintain software applications.",
      Requirement: "C#, .NET, SQL",
      WorkingModelId: 11,
      JobTypeId: 9,
      ExperienceId: 10,
      JobTitleId: 7,
      RecruiterId: 7,
      ApplicantCount: 3,
    };
    try {
      await updateListItemService(lists.Jobs, currentUser?.id, a);
      Alert.alert(
        "Thông báo",
        "Job information saved successfully!",
        JSON.stringify(values)
      );
    } catch (error) {
      console.log(error, "error");
      Alert.alert("Thông báo", "An error occurred, please try again later!");
    }
  };

  const validationSchema = Yup.object({
    Locations: Yup.string().required("Location is required."),
    MinSalary: Yup.number()
      .required("Minimum salary is required.")
      .min(0, "Minimum salary must be greater than or equal to 0."),
    MaxSalary: Yup.number()
      .required("Maximum salary is required.")
      .min(
        Yup.ref("MinSalary"),
        "Maximum salary must be greater than minimum salary."
      ),
    Description: Yup.string().required("Description is required."),
    Requirement: Yup.string().required("Requirement is required."),
    JobTypeId: Yup.string().required("Job type is required."),
    ExperienceId: Yup.string().required("Experience is required."),
    JobTitleId: Yup.string().required("Job title is required."),
    WorkingModelId: Yup.string().required("Working time is required."),
  });

  return (
    <FlashList
      estimatedItemSize={1}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <SafeAreaView />
          <IconButton type="back" size="small" />
          <Formik
            initialValues={{
              Locations: "",
              MinSalary: "",
              MaxSalary: "",
              Description: "",
              Requirement: "",
              JobTypeId: "",
              ExperienceId: "",
              JobTitleId: "",
              WorkingModelId: "",
            }}
            onSubmit={handleSubmit}
            // validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View>
                <Text style={styles.title}>Create Job</Text>

                {/* Địa điểm */}
                <Text style={styles.label}>Locations</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter locations"
                  onChangeText={handleChange("Locations")}
                  onBlur={handleBlur("Locations")}
                  value={values.Locations}
                />
                {touched.Locations && errors.Locations && (
                  <Text style={styles.errorText}>{errors.Locations}</Text>
                )}

                <View className="gap-4 flex flex-row">
                  <View className="flex-1">
                    {/* Lương tối thiểu */}
                    <Text style={styles.label}>Min Salary</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter min salary"
                      onChangeText={handleChange("MinSalary")}
                      onBlur={handleBlur("MinSalary")}
                      value={values.MinSalary}
                      keyboardType="numeric"
                    />
                    {touched.MinSalary && errors.MinSalary && (
                      <Text style={styles.errorText}>{errors.MinSalary}</Text>
                    )}
                  </View>

                  <View className="flex-1">
                    {/* Lương tối đa */}
                    <Text style={styles.label}>Max Salary</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter max salary"
                      onChangeText={handleChange("MaxSalary")}
                      onBlur={handleBlur("MaxSalary")}
                      value={values.MaxSalary}
                      keyboardType="numeric"
                    />
                    {touched.MaxSalary && errors.MaxSalary && (
                      <Text style={styles.errorText}>{errors.MaxSalary}</Text>
                    )}
                  </View>
                </View>

                {/* Mô tả */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter description"
                  onChangeText={handleChange("Description")}
                  onBlur={handleBlur("Description")}
                  value={values.Description}
                  multiline
                />
                {touched.Description && errors.Description && (
                  <Text style={styles.errorText}>{errors.Description}</Text>
                )}

                {/* Yêu cầu */}
                <Text style={styles.label}>Requirement</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Nhập yêu cầu"
                  onChangeText={handleChange("Requirement")}
                  onBlur={handleBlur("Requirement")}
                  value={values.Requirement}
                  multiline
                />
                {touched.Requirement && errors.Requirement && (
                  <Text style={styles.errorText}>{errors.Requirement}</Text>
                )}

                {/* Loại công việc */}
                <Text style={styles.label}>Job Type</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={jobTypes?.map((item) => {
                    return { label: item.Title, value: item.Id };
                  })}
                  placeholder="Select job type"
                  labelField="label"
                  valueField="value"
                  value={values.JobTypeId}
                  onChange={(item) => setFieldValue("JobTypeId", item.value)}
                />
                {touched.JobTypeId && errors.JobTypeId && (
                  <Text style={styles.errorText}>{errors.JobTypeId}</Text>
                )}

                {/* Kinh nghiệm */}
                <Text style={styles.label}>Experience</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={experienceLevels?.map((item) => {
                    return { label: item.Title, value: item.Id };
                  })}
                  placeholder="Select experience"
                  labelField="label"
                  valueField="value"
                  value={values.ExperienceId}
                  onChange={(item) => setFieldValue("ExperienceId", item.value)}
                />
                {touched.ExperienceId && errors.ExperienceId && (
                  <Text style={styles.errorText}>{errors.ExperienceId}</Text>
                )}

                {/* Chức danh */}
                <Text style={styles.label}>Job Title</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={jobTitles?.map((item) => {
                    return { label: item.Title, value: item.Id };
                  })}
                  placeholder="Select job title"
                  labelField="label"
                  valueField="value"
                  value={values.JobTitleId}
                  onChange={(item) => setFieldValue("JobTitleId", item.value)}
                />
                {touched.JobTitleId && errors.JobTitleId && (
                  <Text style={styles.errorText}>{errors.JobTitleId}</Text>
                )}

                {/* Thời gian làm việc */}
                <Text style={styles.label}>Working Model</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={workingModels?.map((item) => {
                    return { label: item.Title, value: item.Id };
                  })}
                  placeholder="Select working time"
                  labelField="label"
                  valueField="value"
                  value={values.WorkingModelId}
                  onChange={(item) =>
                    setFieldValue("WorkingModelId", item.value)
                  }
                />
                {touched.WorkingModelId && errors.WorkingModelId && (
                  <Text style={styles.errorText}>{errors.WorkingModelId}</Text>
                )}

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  dropdown_placeholder: {
    fontSize: 16,
    color: "#888",
  },
});
