import shopActionTypes from "./shop.types";
import { put, all, call, takeEvery } from "redux-saga/effects";
import { fetchCollectionFailure, fetchCollectionSuccess } from "./shop.actions";

export const convertPhpToMap = (collections) => {
  const transformedCollection = collections.map((collection) => {
    const { items, title, id } = collection;
    return {
      title,
      items,
      id,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

function* fetchCollectionStartAysnc() {
  try {
    const response = yield fetch("http://localhost/marketphp-code/getData.php");
    const data = yield response.json();
    const collectionMap = yield call(convertPhpToMap, data);
    yield put(fetchCollectionSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }
}

function* onFetchCollectionStart() {
  yield takeEvery(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionStartAysnc
  );
}

export default function* shopSagas() {
  yield all([call(onFetchCollectionStart)]);
}
