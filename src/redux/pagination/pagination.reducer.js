import paginationActionTypes from "./pagination.types";

const INITIAL_STATE = {
  currentPage: 1,
  postsPerPage: 1,
  currentButton: 1,
};

const paginationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case paginationActionTypes.SET_POSTS_PER_PAGE:
      return {
        ...state,
        postsPerPage: action.payload,
      };
    case paginationActionTypes.SET_CURRENT_BUTTON:
      return {
        ...state,
        currentButton: action.payload,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default paginationReducer;
