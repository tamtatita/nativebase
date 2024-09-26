import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "@/components/ui";
import { Feather, Ionicons } from "@expo/vector-icons";
import { formatISOTOAgo } from "@/utils";
import { Link, router } from "expo-router";
const Chat = () => {
  const [dataChat, setDataChat] = useState([]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i,
        name: `Hello ${i}`,
        message: `This is message ${i}`,
        lastTime: "2024-09-25T13:34:10.249Z",
        image_url:
          "https://i.pinimg.com/736x/f6/79/8f/f6798f45b86b646e7e5e88696c5f220d.jpg",
      });
    }
    setDataChat(data);
  }, []);
  const RenderHeader = () => {
    return (
      <View>
        <SafeAreaView />

        <View className="p-5 flex items-center flex-row justify-between">
          <IconButton type="back" size="small" />
          <Text className="text-xl font-bold text-white">Chat</Text>
          <Text className="opacity-0">gegw</Text>
        </View>

        <View className="bg-white sticky top-0 h-[60px] flex items-start justify-center mt-5 mx-5 rounded-xl flex-1">
          <View className="flex flex-1 items-center flex-row p-3">
            <View>
              <Ionicons name="search" size={24} color="gray" />
            </View>
            <View className="flex-1 ml-2">
              <TextInput
                // onPress={() => router.push("/search")}
                placeholder="Search ...."
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const RenderBodyChat = memo(() => {
    return (
      <View className="mt-5">
        <FlashList
          estimatedItemSize={20}
          data={dataChat}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => router.push(`(auth)/chat/${item?.id}`)}
                className="flex flex-row items-start p-3 bg-white border-[1px] border-gray-200 mb-2 mx-4 rounded-md"
              >
                <View>
                  <Image
                    source={{ uri: item.image_url }}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="font-bold text-lg">{item?.name}</Text>
                  <Text>{item?.message}</Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-sm">
                    {formatISOTOAgo(item?.lastTime || new Date())}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  });

  return (
    <View className="bg-primary flex-1">
      <FlashList
        estimatedItemSize={20}
        ListHeaderComponent={() => {
          return (
            <>
              {RenderHeader()}

              <View className="bg-white rounded-tr-3xl rounded-tl-3xl mt-5">
                <RenderBodyChat />
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
