import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import cartSlice from './slices/cart'
import authSlice from './slices/auth'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'], // Only persist cart and auth
}

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)
export const persistor = persistStore