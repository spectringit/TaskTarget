import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Task, User } from '../types'
import { hashText } from '../utils/storage'
import { loadSaved } from './persist'

export interface AuthState {
  users: User[]
  currentUserId: string | null
}

const { users, currentUserId } = loadSaved()
const initialState: AuthState = { users, currentUserId }

interface Credentials {
  email: string
  password: string
}
interface RegisterData extends Credentials {
  name: string
}
type ThunkConfig = { state: { auth: AuthState }; rejectValue: string }

export const registerUser = createAsyncThunk<{ user: User; seed: Task[] }, RegisterData, ThunkConfig>(
  'auth/register',
  async ({ name, email, password }, { getState, rejectWithValue }) => {
    const mail = email.trim().toLowerCase()
    if (getState().auth.users.some((u) => u.email === mail)) return rejectWithValue('ამ ელფოსტით მომხმარებელი უკვე არსებობს')

    const id = crypto.randomUUID()
    const now = new Date()
    const day = (n: number) => new Date(now.getTime() + n * 86400000).toISOString().slice(0, 10)
    const mk = (title: string, description: string, status: Task['status'], priority: Task['priority'], n: number): Task => ({
      id: crypto.randomUUID(), title, description, status, priority, dueDate: day(n), ownerId: id, createdAt: now.toISOString(),
    })

    return {
      user: { id, name: name.trim(), email: mail, passwordHash: await hashText(password) },
      seed: [
        mk('პროექტის გეგმის დაწერა', 'ეტაპები, ვადები და რისკების ცხრილი.', 'in-progress', 'high', 3),
        mk('GitHub-ზე ატვირთვა', 'რეპოზიტორიის შექმნა და პირველი push.', 'todo', 'medium', 7),
        mk('პრეზენტაციის მომზადება', 'სლაიდები და დემო სცენარი.', 'todo', 'low', 10),
      ],
    }
  },
)

export const loginUser = createAsyncThunk<string, Credentials, ThunkConfig>(
  'auth/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    const u = getState().auth.users.find((x) => x.email === email.trim().toLowerCase())
    if (!u || u.passwordHash !== (await hashText(password))) return rejectWithValue('ელფოსტა ან პაროლი არასწორია')
    return u.id
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.currentUserId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user)
        state.currentUserId = action.payload.user.id
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUserId = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.users.find((u) => u.id === state.auth.currentUserId) ?? null
export default authSlice.reducer
