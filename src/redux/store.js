// store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist the user slice
};
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabling serializable check for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
