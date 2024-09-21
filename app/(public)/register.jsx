import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";
import {
  Form,
  Icon,
  Input,
  Radio,
  WhiteSpace,
  WingBlank,
  Flex as Row,
} from "@ant-design/react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { TitleHeader } from "@/components/global";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button } from "@/components/ui";
import { Colors } from "@/constants/Colors";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [openPass, setOpenPass] = useState({
    password: "false",
    confirmPassword: false,
  });

  const handleOpenPass = (type) => {
    setOpenPass({ ...openPass, [type]: !openPass[type] });
  };

  // Format bằng Yup

  const signupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Hãy nhập Email"),
    password: yup
      .string()
      .min(8, ({ min }) => `Mật khẩu phải dài hơn 8 kí tự`)
      .required("Hãy nhập mật khẩu"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp")
      .required("Yêu cầu nhập lại mật khẩu"),
  });

  const handleSubmitForm = (values) => {
    console.log(values, "values");
  };

  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ headerBackVisible: !pendingVerification }} /> */}
      {/* <Spinner visible={loading} /> */}

      {/* Tên tiêu đề */}
      <TitleHeader
        title={"Tạo tài khoản"}
        desc={"Lorem import PropTypes from "}
      />

      <View className="flex flex-col ">
        <Formik
          validationSchema={signupValidationSchema}
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="flex flex-col gap-3">
              <View>
                <Text className="font-semibold text-lg">Email</Text>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  className="bg-slate-200 h-12 rounded-md text-xl"
                />
                {errors.email && (
                  <Text
                    style={{ fontSize: 14, color: "red", marginVertical: 4 }}
                  >
                    {errors.email}
                  </Text>
                )}
              </View>

              <View>
                <Text className="font-semibold text-lg">Nhập mật khẩu</Text>
                <View className="relative">
                  <TextInput
                    onChangeText={handleChange("password")}
                    value={values.password}
                    secureTextEntry={openPass.password ? true : false}
                    className="bg-slate-200 px-3 h-12 text-xl rounded-md"
                  />

                  <TouchableOpacity
                    onPress={() => handleOpenPass("password")}
                    className="absolute right-3 top-3"
                  >
                    <Entypo name="eye" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text
                    style={{ fontSize: 14, color: "red", marginVertical: 4 }}
                  >
                    {errors.password}
                  </Text>
                )}
              </View>

              <View>
                <Text className="font-semibold text-lg">Nhập lại mật khẩu</Text>
                <View className="relative">
                  <TextInput
                    onChangeText={handleChange("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={openPass.confirmPassword ? true : false}
                    className="bg-slate-200 px-3 h-12 text-xl rounded-md"
                  />

                  <TouchableOpacity
                    onPress={() => handleOpenPass("confirmPassword")}
                    className="absolute right-3 top-3"
                  >
                    <Entypo name="eye" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                </View>

                {errors.confirmPassword && (
                  <Text
                    style={{ fontSize: 14, color: "red", marginVertical: 4 }}
                  >
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
            </View>
          )}
        </Formik>
        <Button className="mt-5" type="full" title={"Đăng ký"} />
      </View>

      {/* Đăng nhập bằng tài khoản khác */}
      <View className="flex items-center justify-center my-3">
        <Text className="text-gray-500 text-[13px]">Hoặc đăng ký bằng</Text>
        <View className="flex flex-row items-center gap-6 my-2">
          <TouchableOpacity className="bg-gray-200 p-3 rounded-full">
            <AntDesign name="google" size={30} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 p-3 rounded-full">
            <Entypo name="facebook" size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Đã có tài khoản */}

      <View className="flex items-center flex-row justify-center">
        <Text className="text-center text-gray-500 text-[13px]">
          Bạn đã có tài khoản?
        </Text>
        <Button type={"link"} title={"Đăng nhập"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default Register;
