import { takeLatest, put, all, call } from "redux-saga/effects";
import userActionType from "./user.types";
import axios from "axios";
import { setCurrnetUserFailure, setCurrnetUserSuccess } from "./user.action";

export function* singInSetCurrentUser({ payload: { email, password } }) {
  try {
    var formData = yield new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = yield axios.post(
      "http://localhost/marketphp-code/singIn.php",
      formData
    );
    // console.log(response);
    // console.log(response.data);
    if (response.status === 200 && typeof response.data === "object") {
      const { displayName, email, id } = yield response.data;
      yield put(
        setCurrnetUserSuccess({
          displayName,
          email,
          id,
        })
      );
    } else if (response.status === 200 && response.data.length > 1) {
      alert(response.data);
    }
  } catch (error) {
    yield put(setCurrnetUserFailure(error.message));
  }
}

export function* onSetCurrentuserStartInSingIn() {
  yield takeLatest(
    userActionType.START_SET_CURRENT_USER_SING_IN,
    singInSetCurrentUser
  );
}

////////////////////////////////////////////////////////////

export function* singUpSetCurrentUser({
  payload: { email, password, displayName },
}) {
  try {
    var formData = new FormData();
    formData.append("displayName", displayName);
    formData.append("email", email);
    formData.append("password", password);

    const response = yield axios.post(
      "http://localhost/marketphp-code/insertUserData.php",
      formData
    );

    if (response.status === 200 && typeof response.data === "object") {
      const { displayName, email, id } = yield response.data;
      yield put(
        setCurrnetUserSuccess({
          displayName,
          email,
          id,
        })
      );
    } else if (response.status === 200 && response.data.length > 1) {
      alert(response.data);
    }
  } catch (error) {
    yield put(setCurrnetUserFailure(error.message));
  }
}

export function* onSetCurrentuserStartInSingUp() {
  yield takeLatest(
    userActionType.START_SET_CURRENT_USER_SING_UP,
    singUpSetCurrentUser
  );
}

//* ********************************************************** */
export default function* userSagas() {
  yield all([
    call(onSetCurrentuserStartInSingIn),
    call(onSetCurrentuserStartInSingUp),
  ]);
}
