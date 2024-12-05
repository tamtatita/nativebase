import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { IconButton } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";

import { Loading, ChatItem } from "@/components";

import Entypo from "@expo/vector-icons/Entypo";

import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import config from "./../../../utils/config";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "@/components/providers/AuthProvider";

import { GENDERS } from "./../../../constants/index";
import {
  addDataChat,
  initAsyncThunk,
  MODULE_MESSAGEBOX,
  sendMessageAsyncThunk,
  setMessageText,
} from "../../../store/messagebox";

import FeMaleImage from "@/assets/images/female-avatar.png";
import MaleImage from "@/assets/images/male-avatar.png";

const ChatDetail = () => {
  const connRef = useRef(null); // Dùng useRef để lưu conn
  const flashListRef = useRef(null); // Tham chiếu đến FlashList
  const {
    loading,
    dataChat,
    messageText,
    messageBox,
    recruiter,
    candidate,
    newMessage,
  } = useSelector((state) => state[MODULE_MESSAGEBOX]);
  const { profile } = useAuth();
  const currentUser = useMemo(() => {
    return profile.user;
  }, [profile]);

  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const userChat = useMemo(() => {
    return currentUser.id == params.RecruiterId ? candidate : recruiter;
  }, [currentUser, params]);

  const userChatImage = useMemo(() => {
    if (userChat?.ImageUrl) {
      return { uri: userChat?.ImageUrl };
    }
    return userChat?.Gender === GENDERS.MALE ? MaleImage : FeMaleImage;
  }, [userChat]);

  const joinSpecifyBoxMessage = async (RecruiterId, CandidateId) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl(`${config.BASE_URL}/chatHub`)
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecifyBoxMessageResp", (message) => {
        console.log(message);
      });

      conn.on("SendMessageResp", (resp) => {
        dispatch(addDataChat(resp));
      });

      await conn.start();
      await conn.invoke("JoinSpecifyBoxMessage", { RecruiterId, CandidateId });
      connRef.current = conn;
    } catch (error) {
      console.error("Error joining chat: ", error);
    }
  };
  const handleAfterSendMessage = async () => {
    try {
      await connRef.current.invoke("SendMessage", {
        NewMessageId: newMessage.Id,
        CandidateId: newMessage.CandidateId,
        RecruiterId: newMessage.RecruiterId,
        SenderId: newMessage.SenderId,
        MessageBoxId: messageBox?.Id,
      });
    } catch (error) {
      console.error("Error after send message: ", error);
    }
  };

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

  useEffect(() => {
    if (newMessage?.Id) {
      handleAfterSendMessage();
    }
  }, [newMessage]);

  useFocusEffect(
    useCallback(() => {
      const { CandidateId, RecruiterId } = params;
      dispatch(initAsyncThunk({ CandidateId, RecruiterId }));
      joinSpecifyBoxMessage(parseInt(RecruiterId), parseInt(CandidateId));

      return () => {
        handleBack(); //
      };
    }, [])
  );

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
                  source={userChatImage}
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
              </View>

              <View>
                <Text className="text-white font-bold text-lg">
                  {userChat.FullName}
                </Text>
                <Text className="text-white text-xs">Online</Text>
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
        <FlatList
          inverted
          ref={flashListRef} // Tham chiếu đến FlashList
          scrollEnabled
          ListEmptyComponent={() =>
            loading ? null : <Text>No Data Available</Text>
          }
          showsVerticalScrollIndicator={false}
          data={dataChat}
          renderItem={({ item }) => <ChatItem data={item} />}
          keyExtractor={(item) => item.Id || item.id}
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
          value={messageText}
          onChangeText={(text) => dispatch(setMessageText(text))}
          placeholder="Enter your message"
          className="flex-1 h-14 mr-4 bg-gray-100 rounded-md p-2"
        />

        <IconButton
          icon={<Ionicons name="send" size={24} color="black" />}
          size="medium"
          classNames="rounded-full"
          disabled={!messageText}
          onPress={() => dispatch(sendMessageAsyncThunk({ currentUser }))}
        />
      </View>
    </View>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({});
