import userActionType from "./user.types";

export const singinSetCurrnetUserStart = (email, password) => ({
  type: userActionType.START_SET_CURRENT_USER_SING_IN,
  payload: { email, password },
});
export const singupSetCurrnetUserStart = (displayName, email, password) => ({
  type: userActionType.START_SET_CURRENT_USER_SING_UP,
  payload: { displayName, email, password },
});
export const setCurrnetUserSuccess = (user) => ({
  type: userActionType.SUCCESS_SET_CURRENT_USER,
  payload: user,
});
export const setCurrnetUserFailure = (error) => ({
  type: userActionType.FAILURE_SET_CURRENT_USER,
  payload: error,
});
