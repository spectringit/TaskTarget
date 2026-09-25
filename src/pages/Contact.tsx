import { Form, Formik } from 'formik'
import { useState } from 'react'
import FormField from '../components/FormField'
import { contactSchema } from '../utils/validation'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="page-title">კონტაქტი</h1>
      {sent && <p role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">გმადლობთ! შეტყობინება მიღებულია.</p>}
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={contactSchema}
        onSubmit={(_values, { resetForm }) => {
          setSent(true)
          resetForm()
        }}
      >
        <Form noValidate className="card space-y-4 p-6">
          <FormField name="name" label="სახელი" />
          <FormField name="email" label="ელფოსტა" type="email" />
          <FormField name="message" label="შეტყობინება" as="textarea" rows={5} />
          <button type="submit" className="btn btn-primary">გაგზავნა</button>
        </Form>
      </Formik>
    </div>
  )
}
