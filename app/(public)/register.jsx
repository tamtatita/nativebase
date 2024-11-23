import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { router, Stack } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";
import { TitleHeader } from "@/components";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button, IconButton, InputLabel } from "@/components/ui";
import { Colors } from "@/constants/Colors";
import { signupValidationSchema } from "@/lib/validation";
import { getAuth, registerServiceForUser } from "@/utils/services";
import { handleError } from "@/utils/helpers";
import * as SecureStore from "expo-secure-store";
import config from "@/utils/config";
import { LOGIN_TYPES } from "../../constants";
import { useAuth } from "@/components/providers/AuthProvider";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [openPass, setOpenPass] = useState({
    password: "false",
    confirmPassword: false,
  });

  const handleOpenPass = (type) => {
    setOpenPass({ ...openPass, [type]: !openPass[type] });
  };
  const { setProfile } = useAuth();
  const handleSubmitForm = async (values) => {
    try {
      const { email, password } = values;
      const registerRes = await registerServiceForUser(email, password);
      await SecureStore.setItemAsync(
        config.LOCAL_ACCESS_TOKEN,
        registerRes.token.accessToken
      );
      await SecureStore.setItemAsync(
        config.LOCAL_REFRESH_TOKEN,
        registerRes.token.refreshToken
      );
      await SecureStore.setItemAsync(
        config.LOCAL_AUTHENTICATED,
        JSON.stringify(registerRes)
      );
      await SecureStore.setItemAsync(
        config.LOCAL_LOGIN_TYPE,
        JSON.stringify(LOGIN_TYPES.MANUAL)
      );

      const newProfile = await getAuth();
      await SecureStore.setItemAsync(
        config.LOCAL_PROFILE,
        JSON.stringify(newProfile)
      );
      setProfile(newProfile);
    } catch (error) {
      const err = handleError(error);
      if (err?.includes("Username already taken!")) {
        alert("Email đã tồn tại");
      } else {
        alert("Đã có lỗi xảy ra");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View style={styles.container}>
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
                <View className="flex flex-col mb-4">
                  <View>
                    <InputLabel title={"Nhập email"} />
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      className="bg-slate-200 h-12 rounded-md text-xl px-3"
                    />

                    <InputLabel
                      title={errors.email ? errors.email : ""}
                      danger={true}
                    />
                  </View>

                  <View>
                    <InputLabel title={"Nhập mật khẩu"} />
                    <View className="relative">
                      <TextInput
                        onChangeText={handleChange("password")}
                        value={values.password}
                        secureTextEntry={openPass.password ? true : false}
                        className="bg-slate-200 px-3 h-12 text-xl rounded-md "
                      />

                      <IconButton
                        shape={"circle"}
                        color={"primary"}
                        onPress={() => handleOpenPass("password")}
                        size={"small"}
                        classNames={"absolute right-2 top-1"}
                        icon={
                          <Entypo name="eye" size={24} color={Colors.primary} />
                        }
                      />
                    </View>

                    <InputLabel
                      title={errors.password ? errors.password : ""}
                      danger={true}
                    />
                  </View>

                  <View>
                    <InputLabel title={"Nhập lại mật khẩu"} />
                    <View className="relative">
                      <TextInput
                        onChangeText={handleChange("confirmPassword")}
                        value={values.confirmPassword}
                        secureTextEntry={
                          openPass.confirmPassword ? true : false
                        }
                        className="bg-slate-200 px-3 h-12 text-xl rounded-md"
                      />

                      <IconButton
                        shape={"circle"}
                        color={"primary"}
                        onPress={() => handleOpenPass("confirmPassword")}
                        size={"small"}
                        classNames={"absolute right-2 top-1"}
                        icon={
                          <Entypo name="eye" size={24} color={Colors.primary} />
                        }
                      />
                    </View>

                    <InputLabel
                      title={
                        errors.confirmPassword ? errors.confirmPassword : ""
                      }
                      danger={true}
                    />
                  </View>

                  <View>
                    <Button
                      onPress={handleSubmit}
                      className="mt-5"
                      type="full"
                      title={"Đăng ký"}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>

          {/* Đăng nhập bằng tài khoản khác */}
          <View className="flex items-center justify-center my-3">
            <Text className="text-gray-500 text-[13px]">Hoặc đăng ký bằng</Text>
            <View
              className="flex flex-row items-center my-2"
              style={{ display: "flex" }}
            >
              <IconButton
                shape={"circle"}
                icon={<AntDesign name="google" size={30} color="orange" />}
              />

              <IconButton
                shape={"circle"}
                icon={<Entypo name="facebook" size={30} color="blue" />}
              />
            </View>
          </View>

          {/* Đã có tài khoản */}

          <View className="flex items-center flex-row justify-center ">
            <Text className="text-center text-gray-500 text-[13px]">
              Bạn đã có tài khoản?
            </Text>
            <Button
              onPress={() => router.replace("/login")}
              type={"link"}
              title={"Đăng nhập"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
