import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import journalReducer from '@/lib/features/journal/journal-slice';
import themeReducer from '@/lib/features/settings/theme-slice';
import languageReducer from '@/lib/features/settings/language-slice';

// 1. Define the keys we want to persist
const rememberedKeys = ['theme', 'language', 'journal'];

// 2. Combine our reducers
const reducers = {
  journal: journalReducer,
  theme: themeReducer,
  language: languageReducer,
};

// 3. Create a root reducer wrapped with rememberReducer
const rootReducer = rememberReducer(combineReducers(reducers));

// 4. Create a safe storage driver for SSR environments
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
        serializableCheck: false, // Recommended for redux-remember to avoid warnings on internal actions
      }),
  });
};

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
