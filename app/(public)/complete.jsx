import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { TitleHeader } from "../../components/global";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../../constants/Colors";
import { Button, IconButton, InputLabel } from "../../components/ui";
import Entypo from "@expo/vector-icons/Entypo";
import { Formik } from "formik";
import { completeValidationSchema } from "@/lib/validation";
import { Dropdown } from "react-native-element-dropdown";
import { customerType, gender } from "../../constants";
import { router } from "expo-router";
const Complete = () => {
  const handleSubmitForm = async (values) => {
    console.log(values, "values");
    if (values.customerType === "candidate") {
      // Navigate to Candidate Profile
      router.push("/step");
    } else {
      router.replace("(tabs)");
    }
  };
  return (
    <View style={styles.container}>
      <TitleHeader
        title={"Complete Your Profile"}
        desc={
          "Tailwind includes an expertly-crafted default color palette out-of-the-box that is a great starting point if"
        }
      />

      {/* Avatar */}
      <View className="flex items-center flex-row justify-center ">
        <View className="bg-slate-100 w-[130px] h-[130px] rounded-full flex items-center justify-center relative">
          <FontAwesome name="user" size={40} color={Colors.primary} />
          <IconButton
            color={Colors.primary}
            size={"small"}
            shape={"circle"}
            classNames={"absolute -bottom-1 -right-1"}
            icon={<Entypo name="edit" size={24} color="white" />}
          />
        </View>
      </View>

      {/* Form */}
      <View>
        <Formik
          validationSchema={completeValidationSchema}
          initialValues={{
            name: "",
            phone: "",
            gender: "male",
            customerType: "candidate",
          }}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <View>
                <InputLabel title={"Họ và tên"} />
                <TextInput
                  onChangeText={handleChange("name")}
                  value={values.name}
                  className="bg-slate-200 h-12 rounded-md text-xl px-3"
                />

                <InputLabel
                  title={errors.name ? errors.name : ""}
                  danger={true}
                />
              </View>
              <View>
                <InputLabel title={"Số điện thoại"} />
                <TextInput
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  keyboardType="phone-pad"
                  className="bg-slate-200 h-12 rounded-md text-xl px-3"
                />

                <InputLabel
                  title={errors.phone ? errors.phone : ""}
                  danger={true}
                />
              </View>
              <View>
                <InputLabel title={"Giới tính"} />
                <Dropdown
                  className="bg-slate-200 h-12 rounded-md text-xl px-3"
                  data={gender}
                  labelField="label" // Field hiển thị label
                  valueField="value" // Field để lấy giá trị
                  value={values.gender} // Giá trị hiện tại từ Formik
                  onChange={(item) => handleChange("gender")(item.value)} // Cập nhật giá trị khi thay đổi
                />
                <InputLabel
                  title={errors.gender ? errors.gender : ""}
                  danger={true}
                />
              </View>

              <View>
                <InputLabel title={"Loại tuyển dụng"} />
                <Dropdown
                  className="bg-slate-200 h-12 rounded-md text-xl px-3"
                  data={customerType}
                  labelField="label" // Field hiển thị label
                  valueField="value" // Field để lấy giá trị
                  value={values.customerType} // Giá trị hiện tại từ Formik
                  onChange={(item) => handleChange("customerType")(item.value)} // Cập nhật giá trị khi thay đổi
                />
                <InputLabel
                  title={errors.customerType ? errors.customerType : ""}
                  danger={true}
                />
              </View>
              <View>
                <Button
                  onPress={handleSubmit}
                  className="mt-5"
                  type="full"
                  title={"Hoàn tất"}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
});
