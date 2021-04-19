import paginationActionTypes from "./pagination.types";

export const setPostsPerPage = (postCount) => ({
  type: paginationActionTypes.SET_POSTS_PER_PAGE,
  payload: postCount,
});

export const setCurrentButton = (page) => ({
  type: paginationActionTypes.SET_CURRENT_BUTTON,
  payload: page,
});
