import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import { loginUser } from '../redux/authSlice'
import { useAppDispatch } from '../redux/hooks'
import { loginSchema } from '../utils/validation'

export default function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/tasks'
  const [serverError, setServerError] = useState('')

  return (
    <div className="mx-auto max-w-md">
      <h1 className="page-title text-center">შესვლა</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          setServerError('')
          try {
            await dispatch(loginUser(values)).unwrap()
            navigate(from, { replace: true })
          } catch (err) {
            setServerError(typeof err === 'string' ? err : 'დაფიქსირდა შეცდომა. სცადეთ თავიდან.')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate className="card space-y-4 p-6">
            {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
            <FormField name="email" label="ელფოსტა" type="email" autoComplete="email" />
            <FormField name="password" label="პაროლი" type="password" autoComplete="current-password" />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting ? '…' : 'შესვლა'}</button>
            <p className="text-center text-sm text-slate-500">ანგარიში არ გაქვთ? <Link to="/register" className="text-brand-600 hover:underline">დარეგისტრირდით</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  )
}
