import * as Yup from 'yup'
import { todayISO } from './format'

const email = Yup.string().trim().required('ელფოსტა სავალდებულოა').email('ელფოსტის ფორმატი არასწორია')

export const loginSchema = Yup.object({
  email,
  password: Yup.string().required('პაროლი სავალდებულოა'),
})

export const registerSchema = Yup.object({
  name: Yup.string().trim().min(2, 'სახელი მინიმუმ 2 სიმბოლო უნდა იყოს').required('სახელი სავალდებულოა'),
  email,
  password: Yup.string()
    .min(6, 'პაროლი მინიმუმ 6 სიმბოლოა')
    .matches(/[A-Za-z]/, 'პაროლში უნდა იყოს ასოც და ციფრიც')
    .matches(/\d/, 'პაროლში უნდა იყოს ასოც და ციფრიც')
    .required('პაროლი სავალდებულოა'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'პაროლები არ ემთხვევა')
    .required('გაიმეორეთ პაროლი'),
})

export const taskSchema = (isNew: boolean) =>
  Yup.object({
    title: Yup.string()
      .trim()
      .required('სათაური სავალდებულოა')
      .min(3, 'სათაური მინიმუმ 3 სიმბოლოა')
      .max(80, 'სათაური მაქსიმუმ 80 სიმბოლოა'),
    description: Yup.string().max(500, 'აღწერა მაქსიმუმ 500 სიმბოლოა'),
    dueDate: Yup.string()
      .required('ვადა სავალდებულოა')
      .test('not-in-past', 'ვადა წარსულში ვერ იქნება', (v) => !isNew || !v || v >= todayISO()),
  })

export const contactSchema = Yup.object({
  name: Yup.string().trim().min(2, 'სახელი სავალდებულოა').required('სახელი სავალდებულოა'),
  email,
  message: Yup.string().trim().min(10, 'შეტყობინება მინიმუმ 10 სიმბოლოა').required('შეტყობინება სავალდებულოა'),
})
