import shopActionTypes from "./shop.types";

export const fetchCollectionStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});
export const fetchCollectionSuccess = (collections) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});
export const fetchCollectionFailure = (error) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  paylaod: error,
});
