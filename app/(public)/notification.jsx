import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TitleHeader } from "@/components/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { Button } from "@/components/ui";
import { IconButton } from "../../components/ui";
import { router } from "expo-router";
const Notification = () => {
  return (
    <View style={styles.container}>
      <View className="flex items-center flex-row justify-center ">
        <View className="bg-slate-100 w-[130px] h-[130px] rounded-full flex items-center justify-center relative">
          <Ionicons name="notifications" size={40} color={Colors.primary} />
        </View>
      </View>

      <TitleHeader
        title={"Enabel Notification Access"}
        desc={
          "Tailwind includes an expertly-crafted default color palette out-of-the-box that is a great starting point if"
        }
      />

      <View style={{ display: "flex", gap: 30 }}>
        <Button title={"Allow Notification"} type={"full"} />

        <Button
          onPress={() => router.replace("/location")}
          title="Maybe Latter"
          type="link"
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
    gap: 40,
  },
});
