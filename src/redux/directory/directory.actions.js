import directoryActionTypes from "./directory.types";

export const StartFetchCategory = () => ({
  type: directoryActionTypes.FETCH_CATEGORY_START,
});
export const SuccessFetchCategory = (category) => ({
  type: directoryActionTypes.FETCH_CATEGORY_SUCCESS,
  payload: category,
});
export const failureFetchCategory = (error) => ({
  type: directoryActionTypes.FETCH_CATEGORY_FAILURE,
  payload: error,
});
