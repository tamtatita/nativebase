import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ToastProvider } from "@/hooks/useToast";
import AuthProvider from "@/components/providers/AuthProvider"; // Ensure correct import
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../store";
import { PaperProvider } from "react-native-paper";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ToastProvider>
          <PaperProvider>
            <AuthProvider>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(tabs)"
                  options={{ headerShown: false, headerTitle: false }}
                />
                <Stack.Screen
                  name="(public)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="index" options={{ headerShown: false }} />
              </Stack>
            </AuthProvider>
          </PaperProvider>
        </ToastProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
