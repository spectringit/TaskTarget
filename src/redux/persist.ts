import type { Task, User } from '../types'
import { loadJSON } from '../utils/storage'

export const STORAGE_KEY = 'taskflow-state-v1'

export interface SavedState {
  users: User[]
  currentUserId: string | null
  tasks: Task[]
}

const empty: SavedState = { users: [], currentUserId: null, tasks: [] }

export const loadSaved = (): SavedState => loadJSON(STORAGE_KEY, empty)
