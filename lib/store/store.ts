import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import draftReducer from '@/lib/features/draft/draft-slice';
import themeReducer from '@/lib/features/settings/theme-slice';
import languageReducer from '@/lib/features/settings/language-slice';

// Define keys to persist
const rememberedKeys = ['theme', 'language', 'draft'];

const reducers = {
  draft: draftReducer,
  theme: themeReducer,
  language: languageReducer,
};

const rootReducer = rememberReducer(combineReducers(reducers));

const driver =
  typeof window !== 'undefined'
    ? window.localStorage
    : { getItem: () => null, setItem: () => {}, removeItem: () => {} };

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(
        rememberEnhancer(driver, rememberedKeys, {
          persistWholeStore: false,
        })
      ),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
