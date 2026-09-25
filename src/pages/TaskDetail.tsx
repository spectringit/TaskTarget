import { Link, useNavigate, useParams } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from '../components/Badges'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { deleteTask, selectMyTasks } from '../redux/readlistSlice'
import { formatDate, isOverdue } from '../utils/format'

export default function TaskDetail() {
  const { id } = useParams()
  const tasks = useAppSelector(selectMyTasks)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return (
      <div className="card p-10 text-center">
        <p className="mb-4">ამოცანა ვერ მოიძებნა.</p>
        <Link to="/tasks" className="btn btn-primary">უკან სიაში</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/tasks" className="text-sm text-brand-600 hover:underline">← ყველა ამოცანა</Link>
      <article className="card mt-4 space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="whitespace-pre-line text-slate-600">{task.description || 'აღწერა არ არის დამატებული.'}</p>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-400">ვადა</dt>
            <dd className={isOverdue(task.dueDate, task.status) ? 'font-semibold text-red-600' : ''}>{formatDate(task.dueDate)}</dd>
          </div>
          <div>
            <dt className="text-slate-400">შექმნილია</dt>
            <dd>{formatDate(task.createdAt)}</dd>
          </div>
        </dl>
        <div className="flex gap-2 border-t border-slate-100 pt-4">
          <Link to={`/tasks/${task.id}/edit`} className="btn btn-primary">რედაქტირება</Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('დარწმუნებული ხართ?')) {
                dispatch(deleteTask(task.id))
                navigate('/tasks')
              }
            }}
          >
            წაშლა
          </button>
        </div>
      </article>
    </div>
  )
}
