import { all } from "redux-saga/effects";
import watchAuth from "providers/AuthProvider/saga";
import watchMessages from "providers/MessengerProvider/saga";
export default function* rootSaga(): Generator {
  yield all([watchAuth(), watchMessages()]);
}
