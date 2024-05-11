import { push } from "connected-react-router";
// import _get from "lodash/get";
import { call, delay, put, takeEvery, takeLeading } from "redux-saga/effects";

import {
  registerRequest,
  registerRequestError,
  loginError,
  loginRequest,
  // loginSuccess,
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
  updateProfile,
} from "providers/AuthProvider/slice";
import { callApi } from "providers/GeneralProvider/saga";
import api from "utils/service";
import Helper from "utils/Helper";
import { message } from "antd";

export function* handleRegisterRequest(action: any) {
  try {
    const { data } = yield callApi(api.post, "register", action.payload);
    message.success(data);
    yield put(push("/login"));
    window.location.reload();
  } catch (error) {
    yield put(registerRequestError(error.message));
  }
}
function* handleLogin(action) {
  try {
    // NOTE: Replace with your api and configuration

    const { data } = yield callApi(api.post, "auth", action.payload);
    if (data) {
      yield put(push("/home"));
      localStorage.setItem("op_token", data);
      window.location.reload();
    }
  } catch (error) {
    yield put(loginError(error));
  }
}
export function* handleGetProfile(action: any) {
  try {
    const { data } = yield callApi(api.get, "users/me");
    yield put(getProfileSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getProfileError(error));
  }
}
export function* handleSearchUser(action: any) {
  try {
    const { data } = yield callApi(api.get, `users/${action.payload}`);
    yield put(searchUserSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(searchUserError(error));
  }
}
export function* handleRequestAddFriend(action: any) {
  try {
    const { data } = yield callApi(api.post, "addFriend", action.payload);
    yield put(requestAddFriendSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(requestAddFriendError(error));
  }
}
export function* handleGetListAddFriend(action: any) {
  try {
    const { data } = yield callApi(api.get, "addFriendReq/myRequest");
    yield put(getListAddFriendSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getListAddFriendError(error));
  }
}
export function* handleGetAllUser(action: any) {
  try {
    const { data } = yield callApi(api.get, "users");
    yield put(getAllUserSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getAllUserError(error));
  }
}
export function* handleRequestAcceptFriend(action: any) {
  try {
    const { data } = yield callApi(api.post, "acceptFriend", action.payload);
    yield put(requestAcceptFriendSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(requestAcceptFriendError(error));
  }
}
export function* handleGetAllRoom(action: any) {
  try {
    const { data } = yield callApi(api.get, "rooms");
    yield put(getAllRoomSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getAllRoomError(error));
  }
}
export function* handleRequestCreateGroup(action: any) {
  try {
    const { data } = yield callApi(api.post, "room", action.payload);
    yield put(requestCreateGroupSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(requestCreateGroupError(error));
  }
}

export function* handleRequestAddMember(action: any) {
  console.log(action.payload);

  try {
    const { data } = yield callApi(api.post, "room/member", action.payload);
    yield put(requestAddMemberSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(requestAddMemberError(error));
  }
}
export function* handleGetUserOfRom(action: any) {
  try {
    const { data } = yield callApi(
      api.get,
      `rooms/${action.payload.roomId}/members`
    );
    yield put(getUserOfRomSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getUserOfRomError(error));
  }
}
export function* handleDeleteMember(action: any) {
  try {
    const { data } = yield callApi(
      api.delete,
      `rooms/${action.payload.roomId}/${action.payload.username}`
    );
    yield put(deleteMemberSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(deleteMemberError(error));
  }
}
export function* handleUpdateProfile(action: any) {
  try {
    const { data } = yield callApi(api.put, 'users/me/update', action.payload);
    yield put(updateProfileSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(updateProfileError(error));
  }
}

export default function* watchAuth(): Generator {
  yield takeLeading(registerRequest.type, handleRegisterRequest);
  yield takeLeading(loginRequest.type, handleLogin);
  yield takeEvery(getProfile.type, handleGetProfile);
  yield takeEvery(searchUser.type, handleSearchUser);
  yield takeEvery(getListAddFriend.type, handleGetListAddFriend);
  yield takeEvery(getAllUser.type, handleGetAllUser);
  yield takeEvery(requestAddFriend.type, handleRequestAddFriend);
  yield takeEvery(requestAcceptFriend.type, handleRequestAcceptFriend);
  yield takeEvery(getAllRoom.type, handleGetAllRoom);
  yield takeEvery(requestCreateGroup.type, handleRequestCreateGroup);
  yield takeEvery(requestAddMember.type, handleRequestAddMember);
  yield takeEvery(getUserOfRom.type, handleGetUserOfRom);
  yield takeEvery(deleteMember.type, handleDeleteMember);
  yield takeEvery(updateProfile.type, handleUpdateProfile);
}
