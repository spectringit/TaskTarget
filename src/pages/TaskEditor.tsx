import { Form, Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormField from '../components/FormField'
import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from '../constants'
import { selectCurrentUser } from '../redux/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addTask, selectMyTasks, updateTask } from '../redux/readlistSlice'
import type { Priority, Status } from '../types'
import { todayISO } from '../utils/format'
import { taskSchema } from '../utils/validation'

interface TaskValues {
  title: string
  description: string
  status: Status
  priority: Priority
  dueDate: string
}

export default function TaskEditor() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const tasks = useAppSelector(selectMyTasks)
  const navigate = useNavigate()
  const existing = id ? tasks.find((t) => t.id === id) : undefined
  const isNew = !id

  if (id && !existing) {
    return (
      <div className="card p-10 text-center">
        <p className="mb-4">ამოცანა ვერ მოიძებნა.</p>
        <Link to="/tasks" className="btn btn-primary">უკან სიაში</Link>
      </div>
    )
  }

  const initialValues: TaskValues = {
    title: existing?.title ?? '',
    description: existing?.description ?? '',
    status: existing?.status ?? 'todo',
    priority: existing?.priority ?? 'medium',
    dueDate: existing?.dueDate ?? todayISO(),
  }

  function onSubmit(values: TaskValues) {
    const data = { ...values, title: values.title.trim(), description: values.description.trim() }
    if (existing) dispatch(updateTask({ ...existing, ...data }))
    else if (user) dispatch(addTask(data, user.id))
    navigate('/tasks')
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="page-title">{isNew ? 'ახალი ამოცანა' : 'ამოცანის რედაქტირება'}</h1>
      <Formik initialValues={initialValues} validationSchema={taskSchema(isNew)} onSubmit={onSubmit}>
        <Form noValidate className="card space-y-4 p-6">
          <FormField name="title" label="სათაური *" />
          <FormField name="description" label="აღწერა" as="textarea" rows={4} />
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField name="status" label="სტატუსი" as="select">
              {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </FormField>
            <FormField name="priority" label="პრიორიტეტი" as="select">
              {PRIORITIES.map((p) => <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>)}
            </FormField>
            <FormField name="dueDate" label="ვადა *" type="date" />
          </div>
          <div className="flex justify-end gap-2">
            <Link to="/tasks" className="btn btn-ghost">გაუქმება</Link>
            <button type="submit" className="btn btn-primary">{isNew ? 'დამატება' : 'შენახვა'}</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
