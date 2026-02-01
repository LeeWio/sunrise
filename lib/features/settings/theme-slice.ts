import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppTheme =
  | 'light'
  | 'dark'
  | 'airbnb-light'
  | 'airbnb-dark'
  | 'coinbase-light'
  | 'coinbase-dark'
  | 'discord-light'
  | 'discord-dark'
  | 'lavender-light'
  | 'lavender-dark'
  | 'mint-light'
  | 'mint-dark'
  | 'netflix-light'
  | 'netflix-dark'
  | 'rabbit-light'
  | 'rabbit-dark'
  | 'sky-light'
  | 'sky-dark'
  | 'spotify-light'
  | 'spotify-dark'
  | 'uber-light'
  | 'uber-dark';

interface UIState {
  theme: AppTheme;
}

const initialState: UIState = {
  theme: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
