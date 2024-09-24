import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "../../components/ui";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";

const Profile = () => {
  const auth = FIREBASE_AUTH;
  return (
    <View>
      <SafeAreaView />
      <Button title={"Đăng xuất"} onPress={() => signOut(auth)} type={"full"} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
