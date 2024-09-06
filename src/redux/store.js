// store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import orderReducer from "./orders/orderSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","orders"], // only persist the user slice
};
const rootReducer = combineReducers({
  user: userReducer,
  orders: orderReducer,
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
