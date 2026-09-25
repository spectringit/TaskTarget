import { memo } from 'react'
import { Link } from 'react-router-dom'
import { STATUSES, STATUS_LABELS } from '../constants'
import type { Status, Task } from '../types'
import { formatDate, isOverdue } from '../utils/format'
import { PriorityBadge, StatusBadge } from './Badges'
import OfficeImage from './OfficeImage'

interface Props {
  task: Task
  onStatus: (task: Task, status: Status) => void
  onDelete: (task: Task) => void
}

function TaskCard({ task, onStatus, onDelete }: Props) {
  const overdue = isOverdue(task.dueDate, task.status)
  return (
    <article className="card flex flex-col overflow-hidden">
      <OfficeImage alt={task.title} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
        <h3 className="text-lg font-semibold">
          <Link to={`/tasks/${task.id}`} className="hover:text-brand-600">{task.title}</Link>
        </h3>
        <p className="line-clamp-2 text-sm text-slate-500">{task.description || 'აღწერა არ არის'}</p>
        <p className={`text-xs ${overdue ? 'font-semibold text-red-600' : 'text-slate-400'}`}>
          📅 {formatDate(task.dueDate)} {overdue && '· ვადაგადაცილებული'}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <select
            aria-label="სტატუსის შეცვლა"
            className="input !w-auto !py-1"
            value={task.status}
            onChange={(e) => onStatus(task, e.target.value as Status)}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
          <Link to={`/tasks/${task.id}/edit`} className="btn btn-ghost !py-1">რედაქტირება</Link>
          <button className="btn btn-danger !py-1" onClick={() => onDelete(task)}>წაშლა</button>
        </div>
      </div>
    </article>
  )
}

export default memo(TaskCard)