import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import { registerUser } from '../redux/authSlice'
import { useAppDispatch } from '../redux/hooks'
import { registerSchema } from '../utils/validation'

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  return (
    <div className="mx-auto max-w-md">
      <h1 className="page-title text-center">რეგისტრაცია</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirm: '' }}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          setServerError('')
          try {
            await dispatch(registerUser({ name: values.name, email: values.email, password: values.password })).unwrap()
            navigate('/tasks', { replace: true })
          } catch (err) {
            setServerError(typeof err === 'string' ? err : 'დაფიქსირდა შეცდომა. სცადეთ თავიდან.')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate className="card space-y-4 p-6">
            {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
            <FormField name="name" label="სახელი" autoComplete="name" />
            <FormField name="email" label="ელფოსტა" type="email" autoComplete="email" />
            <FormField name="password" label="პაროლი" type="password" autoComplete="new-password" />
            <FormField name="confirm" label="გაიმეორეთ პაროლი" type="password" autoComplete="new-password" />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting ? '…' : 'რეგისტრაცია'}</button>
            <p className="text-center text-sm text-slate-500">უკვე გაქვთ ანგარიში? <Link to="/login" className="text-brand-600 hover:underline">შედით</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  )
}
