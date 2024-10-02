import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { FontAwesome5 } from "@expo/vector-icons";

const LockApp = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontFamily: "Inter", fontSize: 20, marginBottom: 20 }}>
        Protected Info
      </Text>
      <FontAwesome5 name="lock" size={75} color="gray" />

      <Link href={"/day10/protected/second"}>Next page</Link>
    </View>
  );
};

export default LockApp;
