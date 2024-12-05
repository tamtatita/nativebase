import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import { TitleHeader } from "@/components";
import Entypo from "@expo/vector-icons/Entypo";
import { Button, IconButton } from "../../components/ui";
import { Colors } from "@/constants/Colors";
import InputLabel from "../../components/ui/InputLabel";
import { loginValidationSchema } from "@/lib/validation";
import { FIREBASE_AUTH } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { handleSigninGoogle } from "../../utils/auth";
import { useToast } from "../../hooks/useToast";
import { getAuth, loginService } from "../../utils/services";
import * as SecureStore from "expo-secure-store";
import config from "../../utils/config";
import { LOGIN_TYPES } from "../../constants";
import { useAuth } from "../../components/providers/AuthProvider";
import { handleError } from "../../utils/helpers";
import { router } from "expo-router";

const Login = () => {
  const [openPass, setOpenPass] = useState({
    password: "false",
  });
  const { showToast } = useToast();
  const { setProfile } = useAuth();
  const handleOpenPass = (type) => {
    setOpenPass({ ...openPass, [type]: !openPass[type] });
  };

  const handleSubmitForm = async (values) => {
    try {
      const loginRes = await loginService(values.email, values.password);

      await SecureStore.setItemAsync(
        config.LOCAL_ACCESS_TOKEN,
        loginRes.token.accessToken
      );
      await SecureStore.setItemAsync(
        config.LOCAL_REFRESH_TOKEN,
        loginRes.token.refreshToken
      );
      await SecureStore.setItemAsync(
        config.LOCAL_AUTHENTICATED,
        JSON.stringify(loginRes)
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
      showToast({
        message: "Login successfullly",
        type: "success",
        timeClose: 2000,
      });
    } catch (error) {
      const message = handleError(error);

      if (message.indexOf("Incorrect") > -1) {
        showToast({
          message: "Username or password is incorrect",
          type: "error",
          timeClose: 2000,
        });
      } else {
        showToast({
          message: "Login failed",
          type: "error",
          timeClose: 2000,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Tên tiêu đề */}
      <TitleHeader title={"Login"} desc={"Lorem import PropTypes from "} />

      <View className="flex flex-col ">
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="flex flex-col mb-4">
              <View>
                <InputLabel title={"Email"} />
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
                <InputLabel title={"Enter password"} />
                <View className="relative">
                  <TextInput
                    onChangeText={handleChange("password")}
                    value={values.password}
                    secureTextEntry={openPass.password ? true : false}
                    className="bg-slate-200 px-3 h-12 text-xl rounded-md "
                  />

                  <IconButton
                    onPress={() => handleOpenPass("password")}
                    size={"small"}
                    classNames={"absolute top-1 right-1"}
                    color={"transparent"}
                    shape={"circle"}
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
                <Button
                  onPress={handleSubmit}
                  className="mt-5"
                  type="full"
                  title={"Login"}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>

      {/* Đăng nhập bằng tài khoản khác */}
      <View className="flex items-center justify-center my-3">
        <Text className="text-gray-500 text-[13px]">Or login with</Text>
        <View className="flex flex-row items-center gap-6 my-2">
          <TouchableOpacity
            onPress={() => handleSigninGoogle()}
            className="bg-gray-100 p-3 rounded-full"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              width={100}
              height={100}
              className="object-cover h-[30px] w-[30px]"
            />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 p-3 rounded-full">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
              width={100}
              height={100}
              className="object-cover h-[30px] w-[30px]"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Đã có tài khoản */}

      <View className="flex items-center flex-row justify-center ">
        <Text className="text-center text-gray-500 text-[13px]">
          Bạn chưa có tài khoản?
        </Text>
        <Button
          danger
          onPress={() => router.replace("/register")}
          type={"link"}
          title={"Đăng ký"}
        />
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

export default Login;
