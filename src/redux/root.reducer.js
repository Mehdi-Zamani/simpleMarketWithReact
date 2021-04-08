import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import shopReducer from "../redux/shop/shop.reducer";
import directoryReducer from "./directory/directory.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  shop: shopReducer,
  directory: directoryReducer,
});

export default persistReducer(persistConfig, rootReducer);
