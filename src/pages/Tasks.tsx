import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TaskCard from '../components/TaskCard'
import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from '../constants'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteTask, selectMyTasks, updateTask } from '../redux/readlistSlice'
import type { Priority, Status, Task } from '../types'
import { filterAndSortTasks } from '../utils/tasks'

type Sort = 'due' | 'created' | 'priority'

export default function Tasks() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectMyTasks)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<Status | 'all'>('all')
  const [priority, setPriority] = useState<Priority | 'all'>('all')
  const [sort, setSort] = useState<Sort>('due')

  const visible = useMemo(
    () => filterAndSortTasks(tasks, { q, status, priority, sort }),
    [tasks, q, status, priority, sort],
  )

  const onStatus = useCallback((t: Task, s: Status) => dispatch(updateTask({ ...t, status: s })), [dispatch])
  const onDelete = useCallback((t: Task) => {
    if (window.confirm(`წაიშალოს „${t.title}“?`)) dispatch(deleteTask(t.id))
  }, [dispatch])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="page-title !mb-0">ჩემი ამოცანები</h1>
        <Link to="/tasks/new" className="btn btn-primary">+ ახალი ამოცანა</Link>
      </div>

      <div className="card mb-6 grid gap-3 p-4 md:grid-cols-4">
        <input className="input" type="search" placeholder="🔎 ძებნა…" aria-label="ძებნა" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" aria-label="სტატუსი" value={status} onChange={(e) => setStatus(e.target.value as Status | 'all')}>
          <option value="all">ყველა სტატუსი</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
        <select className="input" aria-label="პრიორიტეტი" value={priority} onChange={(e) => setPriority(e.target.value as Priority | 'all')}>
          <option value="all">ყველა პრიორიტეტი</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>)}
        </select>
        <select className="input" aria-label="დალაგება" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="due">დალაგება: ვადით</option>
          <option value="created">დალაგება: ახლები</option>
          <option value="priority">დალაგება: პრიორიტეტით</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="card p-10 text-center text-slate-500">
          {tasks.length === 0 ? 'ამოცანები ჯერ არ გაქვთ. დაამატეთ პირველი!' : 'ფილტრს შედეგი არ აქვს.'}
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm text-slate-500">ნაპოვნია: {visible.length}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((t: Task) => <TaskCard key={t.id} task={t} onStatus={onStatus} onDelete={onDelete} />)}
          </div>
        </>
      )}
    </div>
  )
}
