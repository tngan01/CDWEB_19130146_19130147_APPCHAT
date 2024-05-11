import { push } from "connected-react-router";
// import _get from "lodash/get";
import { call, delay, put, takeEvery, takeLeading } from "redux-saga/effects";

import {
  getMessages,
  getMessagesSuccess,
  getMessagesError,
  requestPinMessages,
  requestPinMessagesSuccess,
  requestPinMessagesError,
  requestUnPinMessages,
  requestUnPinMessagesSuccess,
  requestUnPinMessagesError,
  searchMessages,
  searchMessagesError,
  searchMessagesSuccess,
} from "providers/MessengerProvider/slice";
import { callApi } from "providers/GeneralProvider/saga";
import api from "utils/service";
import Helper from "utils/Helper";
import { message } from "antd";

export function* handleGetMessages(action: any) {
  console.log("jjjj nhi", action.payload);
  try {
    const { data } = yield callApi(api.get, `rooms/${action.payload}/messages`);
    yield put(getMessagesSuccess(data));
  } catch (error) {
    yield put(getMessagesError(error.message));
  }
}
export function* handleRequestPinMessages(action: any) {
  console.log(action.payload);

  try {
    const { data } = yield callApi(
      api.put,
      `rooms/${action.payload.romId}/messages/${action.payload.id}/pin`,
      { pin: action.payload.pin }
    );
    yield put(requestPinMessagesSuccess(data));
  } catch (error) {
    yield put(requestPinMessagesError(error.message));
  }
}
export function* handleRequestUnPinMessages(action: any) {
  console.log(action.payload);

  try {
    const { data } = yield callApi(
      api.put,
      `rooms/${action.payload.romId}/messages/${action.payload.id}/unpin`,
      { pin: action.payload.pin }
    );
    yield put(requestUnPinMessagesSuccess(data));
  } catch (error) {
    yield put(requestUnPinMessagesError(error.message));
  }
}
export function* handleSearchMessages(action: any) {
  console.log(action.payload);

  try {
    const { data } = yield callApi(
      api.get,
      `rooms/${action.payload.idRoom}/${action.payload.content}
      `
    );
    yield put(searchMessagesSuccess(data));
  } catch (error) {
    yield put(searchMessagesError(error.message));
  }
}

export default function* watchMessages(): Generator {
  yield takeEvery(getMessages.type, handleGetMessages);
  yield takeEvery(requestPinMessages.type, handleRequestPinMessages);
  yield takeEvery(requestUnPinMessages.type, handleRequestUnPinMessages);
  yield takeEvery(searchMessages.type, handleSearchMessages);
}
