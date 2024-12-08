import React, { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import debounce from "lodash.debounce";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageUploader from "../../../components/ui/ImageUploader";
import { useAuth } from "../../../components/providers/AuthProvider";
import lists from "../../../utils/lists";
import { Button } from "../../../components/ui";
import { updateListItemService } from "../../../utils/services";
import { router } from "expo-router";
import { toCamelCaseKey } from "../../../utils/helpers";

const RecruiterProfile = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const handleSubmit = async (values) => {
    const dataSubmit = {
      ...values,
      GeoLocation: String(location),
      IsInputInformation: true,
      UserType: "Recruiter",
    };

    try {
      await updateListItemService(lists.Users, currentUser?.id, dataSubmit);
      const newUser = {
        ...currentUser,
        ...dataSubmit,
      };
      setProfile({
        ...profile,
        user: toCamelCaseKey(newUser),
      });
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
    CompanyPhone: Yup.string().required("Phone is required."),
    CompanyDescription: Yup.string().required("Description is required."),
    CompanyAddress: Yup.string().required("Address is required."),
    GeoLocation: Yup.string().required("Location is required."),
  });
  const { profile, setProfile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data.slice(0, 5)); // Giới hạn hiển thị 5 gợi ý
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      Alert.alert("Lỗi", "Không thể lấy danh sách gợi ý.");
    }
  };

  // Sử dụng debounce để giảm số lần gọi API
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );
  const handleSelectSuggestion = (item) => {
    const { lat, lon, display_name } = item;
    setLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    //  setMarker({
    //    latitude: parseFloat(lat),
    //    longitude: parseFloat(lon),
    //    title: display_name,
    //  });
    setSuggestions([]);
    setSearchQuery(display_name);
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);
    debouncedFetchSuggestions(text); // Gọi hàm debounce
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Formik
        initialValues={{
          FullName: "",
          Phone: "",
          CompanyDescription: "",
          GeoLocation: "",
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
            <Text style={styles.title}>Company Information</Text>

            {/* Tên công ty */}
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              onChangeText={handleChange("FullName")}
              onBlur={handleBlur("FullName")}
              value={values.FullName}
            />
            {touched.FullName && errors.FullName && (
              <Text style={styles.errorText}>{errors.FullName}</Text>
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

            {/* Vị trí */}
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Enter company description"
              // onChangeText={handleChange("GeoLocation")}
              onChangeText={handleInputChange}
              onBlur={handleBlur("GeoLocation")}
              value={searchQuery}
            />
            {touched.GeoLocation && errors.GeoLocation && (
              <Text style={styles.errorText}>{errors.GeoLocation}</Text>
            )}
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSelectSuggestion(item)}
                  >
                    <Text>{item.display_name}</Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionsList}
              />
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
          </View>
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
  suggestionsList: {
    backgroundColor: "white",
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
