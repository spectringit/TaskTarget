export type Status = 'todo' | 'in-progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  dueDate: string
  ownerId: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
}
