import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "@/components/ui";
import { Feather, Ionicons } from "@expo/vector-icons";
import { formatISOTOAgo } from "@/utils";
import { Link, router, useFocusEffect } from "expo-router";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import lists from "./../../utils/lists";
import { getItemsService } from "./../../utils/services";
import { useDispatch, useSelector } from "react-redux";
import { MODULE_AUTH } from "../../store/auth";
import { USERTYPES } from "../../constants";
import NoImage from "../../assets/images/no-image.png";
import { setNewMessage } from "../../store/messagebox";
import { useAuth } from "@/components/providers/AuthProvider";
import config from "../../utils/config";

const Chat = () => {
  const [dataChat, setDataChat] = useState([]);
  const [joinChatCon, setJoinChatCon] = useState(null);

  const connRef = useRef(null); // Dùng useRef để lưu conn
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile?.user;
  }, [profile]);

  const dispatch = useDispatch();

  const handleBack = async () => {
    try {
      if (connRef.current) {
        await connRef.current.stop();
        console.log("Connection stopped successfully.");
      } else {
        console.log("No active connection to stop.");
      }
    } catch (error) {
      console.error("Error stopping connection: ", error);
    }
  };

  const handleJoinChatReceiveMessage = async (effectDataChat) => {
    const exsistDataChat = dataChat.find(
      (item) => item.Id === effectDataChat.Id
    );
    if (exsistDataChat) {
      setDataChat(
        dataChat.map((item) =>
          item.Id === effectDataChat.Id ? effectDataChat : item
        )
      );
    } else {
      setDataChat([...dataChat, effectDataChat]);
    }
  };

  const joinChat = async (UserId = 1) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl(`${config.BASE_URL}/chatHub`)
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinChatReceiveMessage", (resp) => {
        handleJoinChatReceiveMessage(resp);
      });

      await conn.start();
      await conn.invoke("JoinChat", { UserId });
      connRef.current = conn;
    } catch (error) {
      console.error("Error joining chat: ", error);
    }
  };

  const handleGetChat = async () => {
    let filter = "";
    if (currentUser?.userType === USERTYPES.Candidate) {
      filter = `CandidateId eq ${currentUser?.id}`;
    } else {
      filter = `RecruiterId eq ${currentUser?.id}`;
    }
    const res = await getItemsService(lists.MessageBox, {
      filter,
      expand: "LastMessage,Recruiter,Candidate",
    });
    setDataChat(res.value);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetChat();
      joinChat(currentUser?.id);
      return () => {
        handleBack(); //
      };
    }, [])
  );

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
                onPress={() => {
                  dispatch(setNewMessage({}));
                  router.push(
                    `(auth)/chat?RecruiterId=${item.RecruiterId}&CandidateId=${item.CandidateId}`
                  );
                }}
                className="flex flex-row items-start p-3 bg-white border-[1px] border-gray-200 mb-2 mx-4 rounded-md"
              >
                <View>
                  <Image
                    source={NoImage}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                </View>
                <View className="flex-1 ml-3">
                  <Text className="font-bold text-lg">
                    {currentUser?.userType === USERTYPES.Candidate
                      ? item?.Recruiter?.FullName
                      : item?.Candidate?.FullName}
                  </Text>
                  <Text>{item?.LastMessage?.Message}</Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-sm">
                    {formatISOTOAgo(item?.LastMessage?.Created || new Date())}
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
