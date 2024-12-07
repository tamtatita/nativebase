import { Tabs } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { StatusBar } from "react-native";
import { useAuth } from "@/components/providers/AuthProvider";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { USERTYPES } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#B0B0B0",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="recruitmentlist"
        options={{
          tabBarButton:
            currentUser?.userType === USERTYPES.Candidate
              ? () => null
              : undefined,
          title: "Recruitment",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search-minus" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton:
            currentUser?.userType === USERTYPES.Recruiter
              ? () => null
              : undefined,
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
          tabBarButton:
            currentUser?.userType !== USERTYPES.Candidate
              ? () => null
              : undefined,
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marker-alt" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          tabBarButton:
            currentUser?.userType !== USERTYPES.Candidate
              ? () => null
              : undefined,
          title: "Bookmark",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="book-bookmark" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-processing-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarButton:
            currentUser?.userType !== USERTYPES.Recruiter
              ? () => null
              : undefined,
          title: "Notification",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
