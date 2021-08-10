import { createSelector } from "reselect";

//const selectContent = (state) => state.content;
const selectFilters = (state) => state.filters;
//const selectPagination = (state) => state.pagination;

export const selectFiltersFilters = createSelector(
  [selectFilters],
  (filters) => filters.filters
);

/* export const selectEntries = createSelector(
  [selectContent],
  (content) => content.entries
); */

/* export const selectPage = createSelector(
  [selectPagination],
  (pagination) => pagination.page
); */
