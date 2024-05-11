import React from "react";

import { createSlice } from "@reduxjs/toolkit";

export interface MessengerState {
  listMessages: any;
  statusPin: string;
  setUserDatas: {
    sender: string;
    content: string;
    replyId: string;
    messageType: string;
    roomId: string;
  };
}

const initialState = {
  listMessages: [],
  statusPin: "unPin",
  setUserDatas: {
    sender: "",
    content: "",
    replyId: "",
    messageType: "",
    roomId: "",
  },
} as MessengerState;

const messengerSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessages(state, action) {
      return { ...state };
    },
    getMessagesSuccess(state, action) {
      return {
        ...state,
        listMessages: action.payload,
      };
    },
    getMessagesError(state, action) {
      return {
        ...state,
      };
    },
    requestPinMessages(state, action) {
      console.log("he he, okila");
      console.log(action.payload);
      return {
        ...state,
        statusPin: "Pinning",
      };
    },
    requestPinMessagesSuccess(state, action) {
      return {
        ...state,
        statusPin: "Pinned",
      };
    },
    requestPinMessagesError(state, action) {
      return {
        ...state,
      };
    },
    requestUnPinMessages(state, action) {
      return {
        ...state,
        statusPin: "Pinning",
      };
    },
    requestUnPinMessagesSuccess(state, action) {
      return {
        ...state,
        statusPin: "Pinned",
      };
    },
    requestUnPinMessagesError(state, action) {
      return {
        ...state,
      };
    },

    setUserData(state, action) {
      return {
        ...state,
        setUserDatas: {
          sender: action.payload.sender,
          content: action.payload.content,
          replyId: action.payload.replyId,
          messageType: action.payload.messageType,
          roomId: action.payload.romId,
        },
      };
    },
    searchMessages(state, action) {
      return { ...state };
    },
    searchMessagesSuccess(state, action) {
      return { ...state, listMessages: action.payload };
    },
    searchMessagesError(state, action) {
      return { ...state };
    },
  },
});

export const {
  getMessages,
  getMessagesSuccess,
  getMessagesError,
  requestPinMessages,
  requestPinMessagesSuccess,
  requestPinMessagesError,
  requestUnPinMessages,
  requestUnPinMessagesSuccess,
  requestUnPinMessagesError,
  setUserData,
  searchMessages,
  searchMessagesError,
  searchMessagesSuccess,
} = messengerSlice.actions;
export default messengerSlice.reducer;
