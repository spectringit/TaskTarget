import { PRIORITY_LABELS, STATUS_LABELS } from '../constants'
import type { Priority, Status } from '../types'

const statusCls: Record<Status, string> = {
  todo: 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-amber-100 text-amber-800',
  done: 'bg-emerald-100 text-emerald-800',
}
const priorityCls: Record<Priority, string> = {
  low: 'bg-sky-100 text-sky-800',
  medium: 'bg-violet-100 text-violet-800',
  high: 'bg-rose-100 text-rose-800',
}

export const StatusBadge = ({ status }: { status: Status }) => (
  <span className={`badge ${statusCls[status]}`}>{STATUS_LABELS[status]}</span>
)
export const PriorityBadge = ({ priority }: { priority: Priority }) => (
  <span className={`badge ${priorityCls[priority]}`}>{PRIORITY_LABELS[priority]}</span>
)
