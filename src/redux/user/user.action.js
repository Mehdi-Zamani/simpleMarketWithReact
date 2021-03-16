import { userActionType } from "./user.types";

export const setCurrnetUser = (user) => ({
  type: userActionType.SET_CURRENT_USER,
  payload: user,
});
