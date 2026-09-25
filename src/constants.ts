import type { Priority, Status } from './types'

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'გასაკეთებელი',
  'in-progress': 'მიმდინარე',
  done: 'დასრულებული',
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'დაბალი',
  medium: 'საშუალო',
  high: 'მაღალი',
}

export const STATUSES = Object.keys(STATUS_LABELS) as Status[]
export const PRIORITIES = Object.keys(PRIORITY_LABELS) as Priority[]
