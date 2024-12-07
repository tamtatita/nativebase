import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { IconButton } from "../../components/ui";
import { FlashList } from "@shopify/flash-list";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";
import { useAuth } from "../../components/providers/AuthProvider";
import ImageUploader from "../../components/ui/ImageUploader";
import lists from "../../utils/lists";
import FeMaleImage from "@/assets/images/female-avatar.png";
import MaleImage from "@/assets/images/male-avatar.png";
import { GENDERS } from "../../constants";

const Profile = () => {
  const { logout } = useAuth();

  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const defaultSource = useMemo(() => {
    return currentUser?.gender === GENDERS.FEMALE ? FeMaleImage : MaleImage;
  }, [currentUser]);

  const RenderProgress = useCallback(() => {
    return <View></View>;
  }, []);

  const dataList = [
    {
      title: "Thông tin cá nhân",
      icon: <Feather name="user" size={30} color={Colors.primary} />,
      link: "/(auth)/applicantprofile",
    },
    {
      title: "Các đơn đã ứng tuyển",
      icon: <Feather name="book-open" size={30} color={Colors.primary} />,
      link: "jobApplied",
    },
    {
      title: "Đăng xuất",
      icon: <Feather name="log-out" size={30} color={Colors.primary} />,
      onClick: async () => {
        await logout();
      },
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
                    <ImageUploader
                      width={48}
                      dataSource={lists.Users}
                      refId={currentUser?.id}
                      imageUrlColumn="ImageUrl"
                      allowEdit={false}
                      defaultSource={defaultSource}
                    />
                  </View>
                  <View className="flex items-center justify-center">
                    <Text className="font-bold text-lg text-white">
                      {currentUser?.fullName}
                    </Text>
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
                        onPress={() => {
                          if (item.link) {
                            router.push(item.link);
                          }
                          if (item.onClick) {
                            item.onClick();
                          }
                        }}
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
