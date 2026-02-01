import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DraftState {
  content: string;
  saveStatus: 'idle' | 'saving' | 'error';
}

const initialState: DraftState = {
  content: '',
  saveStatus: 'idle',
};

export const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setSaveStatus: (state, action: PayloadAction<'idle' | 'saving' | 'error'>) => {
      state.saveStatus = action.payload;
    },
  },
});

export const { setContent, setSaveStatus } = draftSlice.actions;
export default draftSlice.reducer;
