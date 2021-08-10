import { createSelector } from "reselect";

const selectPagination = (state) => state.pagination;

export const selectCurrentPage = createSelector(
  [selectPagination],
  (pagination) => pagination.currentPage
);
export const selectCurrentButton = createSelector(
  [selectPagination],
  (pagination) => pagination.currentButton
);

export const selectPostsPerPage = createSelector(
  [selectPagination],
  (pagination) => pagination.postsPerPage
);
