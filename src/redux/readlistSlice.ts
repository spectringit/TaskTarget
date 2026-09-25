import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Task } from '../types'
import { registerUser, selectCurrentUser } from './authSlice'
import { loadSaved } from './persist'

export type NewTask = Omit<Task, 'id' | 'ownerId' | 'createdAt'>

const readlistSlice = createSlice({
  name: 'readlist',
  initialState: loadSaved().tasks,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.unshift(action.payload)
      },
      prepare: (data: NewTask, ownerId: string) => ({
        payload: { ...data, id: crypto.randomUUID(), ownerId, createdAt: new Date().toISOString() },
      }),
    },
    updateTask(state, action: PayloadAction<Task>) {
      const i = state.findIndex((t) => t.id === action.payload.id)
      if (i !== -1) state[i] = action.payload
    },
    deleteTask: (state, action: PayloadAction<string>) => state.filter((t) => t.id !== action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.push(...action.payload.seed)
    })
  },
})

export const { addTask, updateTask, deleteTask } = readlistSlice.actions

const selectAllTasks = (state: { readlist: Task[] }) => state.readlist
export const selectMyTasks = createSelector([selectCurrentUser, selectAllTasks], (user, tasks) =>
  user ? tasks.filter((t) => t.ownerId === user.id) : [],
)

export default readlistSlice.reducer
