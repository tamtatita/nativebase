import { Tabs } from "expo-router";
import React, { useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "react-native";

export default function TabLayout() {
  // Sử dụng useEffect để ẩn StatusBar khi component được mount
  useEffect(() => {
    StatusBar.setHidden(true); // Ẩn StatusBar cho toàn bộ các tabs
    return () => StatusBar.setHidden(false); // Hiển thị lại khi unmount (tuỳ chọn)
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary, // Màu khi tab được active
        tabBarInactiveTintColor: "#B0B0B0", // Màu khi tab không được active
        headerShown: false, // Ẩn header
        // tabBarStyle: {
        //   // Tùy chỉnh phong cách của tabBar
        //   position: "absolute",
        //   // bottom: 20, // Nâng cao tab bar lên
        //   height: 100, // Chiều cao tab bar
        //   borderTopWidth: 1, // Bỏ border top
        //   backgroundColor: "white", // Màu nền của tab bar
        // },
        // tabBarLabelStyle: {
        //   // Tùy chỉnh phong cách text của tab
        //   paddingBottom: 5, // Khoảng cách giữa text và icon
        // },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="map-marker-alt" color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="book-bookmark" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="chat-processing-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-circle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recruitmentlist"
        options={{
          title: "Recruitment",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="search-minus" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="demo"
        options={{
          title: "demo",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="search-minus" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
