import { createSelector } from "reselect";

const selectDirectory = (state) => state.directory;

export const selectCategory = createSelector(
  [selectDirectory],
  (directory) => directory.category
);
