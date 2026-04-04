import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  isOpen: boolean;
}

const initialState: EditorState = {
  isOpen: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    openEditor: (state) => {
      state.isOpen = true;
    },
    closeEditor: (state) => {
      state.isOpen = false;
    },
    toggleEditor: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openEditor, closeEditor, toggleEditor } = editorSlice.actions;
export default editorSlice.reducer;