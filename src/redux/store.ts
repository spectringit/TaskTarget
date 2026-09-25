import { configureStore } from '@reduxjs/toolkit'
import { saveJSON } from '../utils/storage'
import authReducer from './authSlice'
import { STORAGE_KEY } from './persist'
import readlistReducer from './readlistSlice'

export const store = configureStore({
  reducer: { auth: authReducer, readlist: readlistReducer },
})

store.subscribe(() => {
  const { auth, readlist } = store.getState()
  saveJSON(STORAGE_KEY, { users: auth.users, currentUserId: auth.currentUserId, tasks: readlist })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
