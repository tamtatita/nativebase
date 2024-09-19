import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <View style={{ display: "flex", gap: "12px" }}>
        <View>
          <Text style={{ fontSize: "18px", fontWeight: 700 }}>Email</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="simon@galaxi.dev"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
        </View>
        <View>
          <Text style={{ fontSize: "18px", fontWeight: 700 }}>Mật khẩu</Text>
          <TextInput
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />
        </View>
      </View>

      <TouchableOpacity
        // onPress={onSignInPress}
        style={{
          backgroundColor: "#6c47ff",
          padding: 10,
          borderRadius: 4,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: "18px" }}>Đăng nhập</Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/register" asChild>
          <Pressable style={styles.button}>
            <Text>Tạo tài khoản</Text>
          </Pressable>
        </Link>

        <Link href="/reset" asChild>
          <Pressable style={styles.button}>
            <Text style={{ color: "blue" }}>Quên mật khẩu?</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
    color: "blue",
  },
});

export default Login;
