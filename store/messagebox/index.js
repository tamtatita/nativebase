import {
  addListItemService,
  getItemsService,
  updateListItemService,
} from "@/utils/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import lists from "./../../utils/lists";
import { MODULE_AUTH } from "../auth";
import { deepCapitalKeys } from "@/utils/helpers";

const initialState = {
  loading: false,
  dataChat: [],
  messageText: "",
  messageBox: {},
  recruiter: {},
  candidate: {},
  newMessage: {},
};

export const initAsyncThunk = createAsyncThunk(
  "messageBox/init",
  async ({ CandidateId, RecruiterId }) => {
    try {
      let [chats, messageBox, users] = await Promise.all([
        getItemsService(lists.Messages, {
          filter: `RecruiterId eq ${RecruiterId} and CandidateId eq ${CandidateId}`,
          expand: "Sender",
          orderby: "Id asc",
        }).then((res) => res.value),
        getItemsService(lists.MessageBox, {
          filter: `RecruiterId eq ${RecruiterId} and CandidateId eq ${CandidateId}`,
        }).then((res) => res.value[0]),
        getItemsService(lists.Users, {
          filter: `Id eq ${RecruiterId} or Id eq ${CandidateId}`,
        }),
      ]);

      return {
        chats,
        messageBox,
        recruiter: users.value.find((user) => user.Id == RecruiterId),
        candidate: users.value.find((user) => user.Id == CandidateId),
      };
    } catch (error) {
      console.log("Error initAsyncThunk: ", error);
      return {
        chats: [],
        messageBox: {},
        recruiter: {},
        candidate: {},
      };
    }
  }
);

export const sendMessageAsyncThunk = createAsyncThunk(
  MODULE_MESSAGEBOX + "/sendMessage",
  async ({ currentUser }, { getState }) => {
    try {
      const { messageText, messageBox, candidate, recruiter } =
        getState()[MODULE_MESSAGEBOX];

      let updateMessagebox = messageBox;

      let newMessage = await addListItemService(lists.Messages, {
        SenderId: currentUser?.id,
        CandidateId: candidate.Id,
        RecruiterId: recruiter.Id,
        Message: messageText,
      });
      if (messageBox) {
        await updateListItemService(lists.MessageBox, messageBox.Id, {
          LastMessageId: newMessage.Id,
        });
        updateMessagebox.LastMessageId = newMessage.Id;
      } else {
        updateMessagebox = await addListItemService(lists.MessageBox, {
          RecruiterId: recruiter.Id,
          CandidateId: candidate.Id,
          LastMessageId: newMessage.Id,
        });
      }
      newMessage.Sender = currentUser;
      return { newMessage, updateMessagebox };
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }
);

export const MODULE_MESSAGEBOX = "MODULE_MESSAGEBOX";
const messsageBoxSlice = createSlice({
  name: MODULE_MESSAGEBOX,
  initialState,
  reducers: {
    setMessageText: (state, action) => {
      state.messageText = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    addDataChat: (state, action) => {
      const newData = [...state.dataChat, deepCapitalKeys(action.payload)];
      // Sắp xếp theo Id giảm dần
      state.dataChat = newData.sort((a, b) => b.Id - a.Id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dataChat = action.payload.chats.sort((a, b) => b.Id - a.Id);
        state.messageBox = action.payload.messageBox;
        state.recruiter = action.payload.recruiter;
        state.candidate = action.payload.candidate;
        state.newMessage = {};
      })
      .addCase(sendMessageAsyncThunk.fulfilled, (state, action) => {
        state.newMessage = action.payload.newMessage;
        state.messageBox = action.payload.updateMessagebox;
      });
  },
});

export const { setMessageText, setNewMessage, addDataChat } =
  messsageBoxSlice.actions;
export const messageBoxReducer = messsageBoxSlice.reducer;
