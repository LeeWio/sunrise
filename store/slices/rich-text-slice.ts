import { createSlice } from "@reduxjs/toolkit";

interface RichTextState {
  isOpen: boolean;
}

const initialState: RichTextState = {
  isOpen: false,
};

export const richTextSlice = createSlice({
  name: "richText",
  initialState,
  reducers: {
    openRichText: (state) => {
      state.isOpen = true;
    },
    closeRichText: (state) => {
      state.isOpen = false;
    },
    toggleRichText: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openRichText, closeRichText, toggleRichText } = richTextSlice.actions;
export default richTextSlice.reducer;
