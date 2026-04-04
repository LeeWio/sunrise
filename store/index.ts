import { configureStore } from "@reduxjs/toolkit";
import richTextReducer from "./slices/rich-text-slice";

export const store = configureStore({
  reducer: {
    richText: richTextReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;