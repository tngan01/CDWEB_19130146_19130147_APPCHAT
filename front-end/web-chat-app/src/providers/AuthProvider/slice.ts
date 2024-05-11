import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { push } from "connected-react-router";
import { useHistory } from "react-router-dom";

// import moment from 'moment';
// import Helper from 'utils/Helper';

interface User {
  address: null;
  avatarUrl: null;
  birthday: null;
  desc: null;
  email: string;
  enable: boolean;
  name: null;
  password: string;
  phone: null;
  role: string;
  token: null;
  verificationCode: string;
}
type Rom = {
  admin: User | null,
  id: number,
  name: string | null,
  createAt: string,
  updateAt: string,
  group: boolean
}

export interface AuthState {
  isLoading: boolean;
  currentUser: unknown;
  profileUser: User;
  isAuthorizing: "idle" | "loading" | "success";
  contentMerchantAgreement: string;
  statusUpdateTC: string;
  userSearch: User;
  listUser: Array<User>;
  listFriendRequest: Array<User>;
  listRoms:Array<Rom>;
  userOfRom:any; 
}

const initialState = {
  isLoading: false,
  currentUser: {},
  profileUser: {},
  contentMerchantAgreement: "",
  statusUpdateTC: "",
  userSearch: {},
  listUser: {},
  listFriendRequest: {},
  listRoms:{},
  userOfRom:{},
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest(state, action) {
      return { ...state, isLoading: true };
    },

    registerRequestError(state, action) {
      message.error(action.payload);
    },

    loginRequest(state, action) {
      return { ...state, isLoading: true };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
      };
    },
    loginError(state, action) {
      // Helper.convertMessage(action.payload);
      return { ...state, isLoading: false };
    },
    getProfile(state) {
      return { ...state, isLoading: true };
    },
    getProfileSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        profileUser: action.payload,
      };
    },
    getProfileError(state, action) {
      // Helper.convertMessage(action.payload);
      return { ...state, isLoading: false };
    },
    searchUser(state, action) {
      return { ...state, isLoading: false };
    },
    searchUserSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        userSearch: action.payload,
      };
    },
    searchUserError(state, action) {},
    requestAddFriend(state, action) {
      return { ...state, isLoading: false };
    },
    requestAddFriendSuccess(state, action) {
      message.success(
        "Friend request sent successfully. Please wait for your friend to accept so you can send messages."
      );
    },
    requestAddFriendError(state, action) {
      message.error("Add Friend Error");
    },
    getListAddFriend(state) {
      return { ...state, isLoading: false };
    },
    getListAddFriendSuccess(state, action) {
      return { ...state, isLoading: false, listFriendRequest: action.payload };
    },
    getListAddFriendError(state) {
      return { ...state, isLoading: false };
    },
    getAllUser(state) {
      return { ...state, isLoading: false };
    },
    getAllUserSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        listUser: action.payload,
      };
    },
    getAllUserError(state, action) {
      message.error("Get list all user error");
    },
    requestAcceptFriend(state, action) {
      return { ...state, isLoading: false };
    },
    requestAcceptFriendSuccess(state, action) {
      message.success("Accept friend request success");
      return {
        ...state,
        isLoading: false,
        // listUser: action.payload,
      };
    },
    requestAcceptFriendError(state, action) {
      message.error("Accept friend request error");
    },
    getAllRoom(state) {
      return { ...state, isLoading: false };
    },
    getAllRoomSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        listRoms: action.payload,
      };
    },
    getAllRoomError(state, action) {
      message.error("Accept friend request error");
    },
    requestCreateGroup(state, action) {
      return { ...state, isLoading: false };
    },
    requestCreateGroupSuccess(state, action) {
      message.success("Create new group success");
      return {
        ...state,
        isLoading: false,
        // listUser: action.payload,
      };
    },
    requestCreateGroupError(state, action) {
      message.error("Create new group error");
    },
    requestAddMember(state, action) {
      return { ...state, isLoading: false };
    },
    requestAddMemberSuccess(state, action) {
      message.success("Add member success");
      return {
        ...state,
        isLoading: false,
      };
    },
    requestAddMemberError(state, action) {
      message.error("Add member error");
    },
    getUserOfRom(state, action) {
      return { ...state, isLoading: false };
    },
    getUserOfRomSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        userOfRom: action.payload
      };
    },
    getUserOfRomError(state, action) {
      message.error("get User error");
    },
    deleteMember(state, action){
      return { ...state, isLoading: false };
    },
    deleteMemberSuccess(state, action){
      return { ...state, isLoading: false };
    },
    deleteMemberError(state, action){
      return { ...state, isLoading: false };
    },
    updateProfile(state, action){
      return { ...state, isLoading: false };
    },
    updateProfileSuccess(state, action){
      message.success("Update profile success")
      return { ...state, isLoading: false };
    },
    updateProfileError(state, action){
      message.warning("Update profile error")
      return { ...state, isLoading: false };
    }
  },
});

export const {
  registerRequest,
  registerRequestError,
  loginRequest,
  loginSuccess,
  loginError,
  getProfile,
  getProfileSuccess,
  getProfileError,
  searchUser,
  searchUserSuccess,
  searchUserError,
  requestAddFriend,
  requestAddFriendSuccess,
  requestAddFriendError,
  getListAddFriend,
  getListAddFriendSuccess,
  getListAddFriendError,
  getAllUser,
  getAllUserSuccess,
  getAllUserError,
  requestAcceptFriend,
  requestAcceptFriendSuccess,
  requestAcceptFriendError,
  getAllRoom,
  getAllRoomSuccess,
  getAllRoomError,
  requestCreateGroup,
  requestCreateGroupSuccess,
  requestCreateGroupError,
  requestAddMember,
  requestAddMemberSuccess,
  requestAddMemberError,
  getUserOfRom,
  getUserOfRomSuccess,
  getUserOfRomError,
  deleteMember,
  deleteMemberSuccess,
  deleteMemberError,
  updateProfileSuccess,
  updateProfileError,
  updateProfile
} = authSlice.actions;

export default authSlice.reducer;
