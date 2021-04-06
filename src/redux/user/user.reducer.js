import userActionType from "./user.types";

const INITIAL_STATE = { currentUser: null, errorMessage: null };
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.SUCCESS_SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    case userActionType.FAILURE_SET_CURRENT_USER:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
