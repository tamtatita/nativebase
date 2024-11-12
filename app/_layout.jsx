import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ToastProvider } from "@/hooks/useToast";
import AuthProvider from "@/components/providers/AuthProvider"; // Ensure correct import
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hiển thị hoặc ẩn SplashScreen khi fonts được tải
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Nếu fonts hoặc trạng thái xác thực chưa load thì trả về null
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Stack>
          <AuthProvider>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </AuthProvider>
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
