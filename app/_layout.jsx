import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import useAuth from "@/hooks/useAuth";
import { ToastProvider } from "@/hooks/useToast";
SplashScreen.preventAutoHideAsync();
import { GestureHandlerRootView } from "react-native-gesture-handler";
const RootLayout = () => {
  const segments = useSegments();
  const router = useRouter();
  const { loading, user } = useAuth();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hàm điều hướng khi đã xác thực người dùng hoặc chưa
  // console.log(user?.displayName, "000");
  useEffect(() => {
    if (loading === false && fontsLoaded) {
      // Điều hướng dựa trên trạng thái xác thực của người dùng
      if (user) {
        // if (user?.displayName === undefined || user?.displayName === null) {
        //   router.replace("/(public)/complete");
        // } else {
        router.replace("/(tabs)");
        // }
      } else {
        router.replace("/(public)/login");
      }
    }
  }, [loading, fontsLoaded, user]);

  // Hiển thị hoặc ẩn SplashScreen khi fonts được tải
  useEffect(() => {
    if (fontsLoaded && loading === false) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  // Nếu fonts hoặc trạng thái xác thực chưa load thì trả về null
  if (!fontsLoaded || loading === true) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ToastProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, headerTitle: false }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
