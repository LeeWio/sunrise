import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'zh-CN' | 'en-US';

interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: 'zh-CN',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
