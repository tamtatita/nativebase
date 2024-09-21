import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native";

const InitialLayout = () => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra điều kiện và thực hiện điều hướng tự động
    // Ví dụ: Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (true) {
      router.replace("/register");
    }
  }, [router]);

  return <Slot />;
};

const RootLayout = () => {
  return <InitialLayout />;
};

export default RootLayout;
