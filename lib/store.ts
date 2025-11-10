import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { fileApi } from "./features/file/file-api";
import { tagApi } from "./features";

import userReducer from "@/lib/features/user/user-slice";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Define the persist configuration, which specifies how and what part of the Redux state should be persisted
const persistConfig = {
  key: "root",
  storage: storage,
  // List of reducers that should not be persisted
  blacklist: [""],
  timeout: 1000,
};

// Adding middleware (logger in this case) to monitor actions in the Redux state
const middleware = [fileApi.middleware, tagApi.middleware];

// Combine all reducers, combining different slices of state into one main rootReducer
const rootReducer = combineReducers({
  auth: userReducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
});

// Apply the persistReducer function to enable persistence for the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Disables the serializable state check for performance reasons
        serializableCheck: false,
      }).concat(middleware),
  });
};

// Create a persistor object, which is responsible for persisting the Redux state
export const persistor = persistStore(makeStore());

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
