import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { setupListeners } from '@reduxjs/toolkit/query'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { authApi } from '@/feature/api/auth-api'
import { tagApi } from '@/feature/api/tag-api'
import { categoryApi } from '@/feature/api/category-api'
import { articleApi } from '@/feature/api/article-api'
import toastRecuder from '@/feature/slice/toast-slice'
import authRecuder from '@/feature/slice/auth-slice'
import articleRecuder from '@/feature/slice/article-slice'
import variantsRecuder from '@/feature/slice/variants-slice'

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage: storage,
  blockList: [''],
  timeout: 1000,
}

const middleware = [
  authApi.middleware,
  tagApi.middleware,
  articleApi.middleware,
  categoryApi.middleware,
]

const rootReducer = combineReducers({
  article: articleRecuder,
  toast: toastRecuder,
  auth: authRecuder,
  variants: variantsRecuder,

  [authApi.reducerPath]: authApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
