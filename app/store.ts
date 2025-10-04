import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

import { authApi } from '@/feature/api/auth-api'
import toastRecuder from '@/feature/slice/toast-slice'
import authRecuder from '@/feature/slice/auth-slice'
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

const middleware = [authApi.middleware]

const rootReducer = combineReducers({
  toast: toastRecuder,
  auth: authRecuder,
  variants: variantsRecuder,

  [authApi.reducerPath]: authApi.reducer,
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
