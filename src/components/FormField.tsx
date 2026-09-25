import { useField } from 'formik'
import type { ReactNode } from 'react'

interface Props {
  name: string
  label: string
  as?: 'input' | 'textarea' | 'select'
  type?: string
  rows?: number
  autoComplete?: string
  children?: ReactNode
}

export default function FormField({ name, label, as = 'input', type = 'text', rows, autoComplete, children }: Props) {
  const [field, meta] = useField(name)
  const error = meta.touched && meta.error ? meta.error : undefined
  const common = { ...field, id: name, className: `input ${error ? 'has-error' : ''}`, 'aria-invalid': !!error }

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {as === 'textarea' && <textarea {...common} rows={rows} />}
      {as === 'select' && <select {...common}>{children}</select>}
      {as === 'input' && <input {...common} type={type} autoComplete={autoComplete} />}
      {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
