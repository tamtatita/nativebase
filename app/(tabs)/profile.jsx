import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { Button, IconButton } from "../../components/ui";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";
import { FlashList } from "@shopify/flash-list";
import { Progress } from "@ant-design/react-native";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";

const Profile = () => {
  const auth = FIREBASE_AUTH;
  const user = {
    name: "John Doe",
    image:
      "https://i.pinimg.com/564x/b4/ce/50/b4ce504973a118b5c62a6f84a8be5cfa.jpg",
  };

  const RenderProgress = useCallback(() => {
    return <View></View>;
  }, []);

  const dataList = [
    {
      title: "Thông tin cá nhân",
      icon: <Feather name="user" size={30} color={Colors.primary} />,
    },
    {
      title: "Phân tích",
      icon: <Ionicons name="analytics" size={30} color={Colors.primary} />,
      link: "analyst",
    },
    {
      title: "Các đơn đã ứng tuyển",
      icon: <Feather name="book-open" size={30} color={Colors.primary} />,
      link: "jobApplied",
    },
    {
      title: "Khóa ứng dụng",
      icon: <Feather name="lock" size={30} color={Colors.primary} />,
      link: "lockApp",
    },
    {
      title: "Cài đặt",
      icon: <Feather name="settings" size={30} color={Colors.primary} />,
    },
  ];
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView />
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          estimatedItemSize={1}
          ListHeaderComponent={() => {
            return (
              <View className="">
                <View className="flex items-center justify-center">
                  <Text className="font-bold text-lg text-slate-700">
                    Profile
                  </Text>
                </View>

                {/* Thông tin user */}
                <View className="bg-primary p-3 mx-5 rounded-xl flex flex-row my-5">
                  <View className="flex items-center justify-center mr-4">
                    <Image
                      className="w-12 h-12 rounded-full"
                      source={{ uri: user.image }}
                    />
                  </View>
                  <View className="flex items-center justify-center">
                    <Text className="font-bold text-lg text-white">
                      {user.name}
                    </Text>

                    <Text className="text-sm text-white">View Profile</Text>
                  </View>

                  <RenderProgress />
                </View>

                {/* List button */}
                <View className="flex my-3 mx-5">
                  <FlashList
                    estimatedItemSize={5}
                    data={dataList}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => router.push(item.link)}
                        className="flex flex-row items-center py-2 gap-1 my-1 justify-between"
                      >
                        <View className="flex items-center gap-x-3 flex-row">
                          {item.icon}
                          <Text className="font-semibold text-[18px] text-slate-700">
                            {item.title}
                          </Text>
                        </View>

                        <IconButton
                          color="transparent"
                          classNames={"text-primary"}
                          size={"small"}
                          icon={
                            <MaterialIcons
                              name="navigate-next"
                              size={24}
                              color={Colors.primary}
                            />
                          }
                        />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.title.toString()}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
