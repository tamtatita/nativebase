import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IconButton } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Loading, ChatItem } from "@/components";
import { FlashList } from "@shopify/flash-list";
import Entypo from "@expo/vector-icons/Entypo";
import { height } from "@/lib/InfoDevice";
const ChatDetail = () => {
  const [loading, setLoading] = useState(true);
  const [dataChat, setDataChat] = useState([]);

  const userChat = {
    id: 1,
    name: "Nguyễn Văn A",
    avatar:
      "https://i.pinimg.com/564x/42/d9/74/42d974eba6db85dd338662bb67d4b9b9.jpg",
  };

  const user = {
    id: 13,
    name: "Nguyễn Bành",
    avatar:
      "https://i.pinimg.com/564x/9d/af/d8/9dafd8dd25308f808d7308ffa58d42e5.jpg",
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            id: i,
            message: `Test tin nhắn của fá fjasf óa ifais fashfas ufuasuf faisfas fưe ${
              i % 2 === 0 ? "Tôi" : "Nó"
            }`,
            isMe: i % 2 === 0,
            timestamp: new Date().toISOString(),
          });
        }

        setDataChat(data);
        setTimeout(() => {
          setLoading(false);
        }, 2300);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAPI();
  }, []);

  const RenderHeader = memo(() => {
    return (
      <View>
        <SafeAreaView />
        <View className="flex p-5  items-center justify-between flex-row">
          <View className="flex items-center flex-row gap-x-2">
            <IconButton type="back" size="small" />

            <View className="flex flex-row items-start gap-x-2">
              <View>
                <Image
                  source={{ uri: userChat.avatar }}
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
              </View>

              <View>
                <Text className="text-white font-bold text-lg">
                  {userChat.name}
                </Text>
                <Text className="text-white text-xs">Đang hoạt động</Text>
              </View>
            </View>
          </View>

          <IconButton
            icon={<Entypo name="menu" size={24} color="black" />}
            size="small"
            classNames="rounded-full"
          />
        </View>
      </View>
    );
  });

  if (loading) {
    return (
      <View className="flex-1 justify-center">
        <Loading />
      </View>
    );
  }

  const RenderDataChat = memo(() => {
    return (
      <View
        // style={{ height: height - 300 }}
        className="bg-white p-5 flex-1 flex flex-col rounded-tr-3xl rounded-tl-3xl"
      >
        <FlashList
          scrollEnabled
          showsVerticalScrollIndicator={false}
          data={dataChat}
          renderItem={({ item }) => (
            <ChatItem userChat={userChat} user={user} data={item} />
          )}
          keyExtractor={(item) => item.id}
          estimatedItemSize={20}
        />
      </View>
    );
  });

  return (
    <View className="bg-primary flex-1 justify-between">
      <RenderHeader />

      <RenderDataChat />

      <View className="flex-row items-center justify-between p-5 bg-white h-[100px] gap-x-3 flex">
        <TextInput
          placeholder="Nhập tin nhắn"
          className="flex-1 h-14 mr-4 bg-gray-100 rounded-md p-2"
        />

        <IconButton
          icon={<Ionicons name="send" size={24} color="black" />}
          size="medium"
          classNames="rounded-full"
        />
      </View>
    </View>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({});
