import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageUploader from "../../../components/ui/ImageUploader";
import { useAuth } from "../../../components/providers/AuthProvider";
import lists from "../../../utils/lists";
import { Button } from "../../../components/ui";
import { updateListItemService } from "../../../utils/services";
import { router } from "expo-router";

const RecruiterProfile = () => {
  const handleSubmit = async (values) => {
    const dataSubmit = {
      ...values,
      IsInputInformation: true,
    };

    try {
      await updateListItemService(lists.Users, currentUser?.id, dataSubmit);
      Alert.alert(
        "Thông báo",
        "Company information saved successfully!",
        JSON.stringify(values)
      );
      router.replace("/(tabs)/recruitmentlist");
    } catch (error) {
      Alert.alert("Thông báo", "An error occurred, please try again later!");
    }
  };

  const validationSchema = Yup.object({
    FullName: Yup.string().required("Company name is required."),
    Email: Yup.string()
      .email("Invalid email format")
      .required("Company Email is required"),
    CompanyPhone: Yup.string().required("Phone is required."),
    CompanyDescription: Yup.string().required("Description is required."),
    CompanyAddress: Yup.string().required("Address is required."),
  });
  const { profile, setProfile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Formik
        initialValues={{
          CompanyName: "",
          Email: "",
          Phone: "",
          CompanyDescription: "",
          CompanyAddress: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
          <ScrollView>
            <Text style={styles.title}>Company Information</Text>

            {/* Tên công ty */}
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              onChangeText={handleChange("CompanyName")}
              onBlur={handleBlur("CompanyName")}
              value={values.CompanyName}
            />
            {touched.CompanyName && errors.CompanyName && (
              <Text style={styles.errorText}>{errors.CompanyName}</Text>
            )}

            {/* Tên công ty */}
            <Text style={styles.label}>Company Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter company email"
              onChangeText={handleChange("Email")}
              onBlur={handleBlur("Email")}
              value={values.Email}
            />
            {touched.Email && errors.Email && (
              <Text style={styles.errorText}>{errors.Email}</Text>
            )}

            {/* Số điện thoại */}
            <Text style={styles.label}>Company Telephone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter company phone"
              onChangeText={handleChange("Phone")}
              onBlur={handleBlur("Phone")}
              value={values.Phone}
              keyboardType="phone-pad"
            />
            {touched.Phone && errors.Phone && (
              <Text style={styles.errorText}>{errors.Phone}</Text>
            )}

            {/* Địa chỉ */}
            <Text style={styles.label}>Company Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter company address"
              onChangeText={handleChange("CompanyAddress")}
              onBlur={handleBlur("CompanyAddress")}
              value={values.CompanyAddress}
              //   keyboardType="address-pad"
            />
            {touched.CompanyAddress && errors.CompanyAddress && (
              <Text style={styles.errorText}>{errors.CompanyAddress}</Text>
            )}

            {/* Mô tả */}
            <Text style={styles.label}>Company Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter company description"
              onChangeText={handleChange("CompanyDescription")}
              onBlur={handleBlur("CompanyDescription")}
              value={values.CompanyDescription}
              multiline
            />
            {touched.CompanyDescription && errors.CompanyDescription && (
              <Text style={styles.errorText}>{errors.CompanyDescription}</Text>
            )}

            {/* Logo */}
            <Text style={styles.label}>Company Logo</Text>

            <View className="items-center mb-6">
              <ImageUploader
                imageUrlColumn={"ImageUrl"}
                allowEdit
                refId={currentUser?.id}
                dataSource={lists.Users}
              />
            </View>

            <Button type="full" title="SAVE" onPress={handleSubmit}></Button>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default RecruiterProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
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
});
