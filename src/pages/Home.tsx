import { Link } from 'react-router-dom'
import OfficeImage from '../components/OfficeImage'
import { selectCurrentUser } from '../redux/authSlice'
import { useAppSelector } from '../redux/hooks'
import { selectMyTasks } from '../redux/readlistSlice'
import { getStats } from '../utils/tasks'

const features = [
  { icon: '🔐', title: 'უსაფრთხო ავტორიზაცია', text: 'რეგისტრაცია და შესვლა — თქვენი ამოცანები მხოლოდ თქვენთვისაა.' },
  { icon: '✏️', title: 'გეგმების განხორციელება', text: 'დაამატეთ, დაარედაქტირეთ და წაშალეთ ამოცანები რამდენიმე წამში.' },
  { icon: '🔎', title: 'ძებნა და ფილტრი', text: 'გაფილტრეთ სტატუსით, პრიორიტეტით და დაალაგეთ ვადით.' },
]

export default function Home() {
  const user = useAppSelector(selectCurrentUser)
  const tasks = useAppSelector(selectMyTasks)
  const st = getStats(tasks)
  const stats = [
    { label: 'სულ', value: st.total },
    { label: 'მიმდინარე', value: st.inProgress },
    { label: 'დასრულებული', value: st.done },
    { label: 'ვადაგადაცილებული', value: st.overdue },
  ]

  return (
    <div className="space-y-16">
      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-500 px-6 py-16 text-center text-white md:py-24">
        <h1 className="text-3xl font-extrabold md:text-5xl">მართეთ ამოცანები მარტივად</h1>
        <p className="mx-auto mt-4 max-w-xl text-brand-100">TaskFlow გეხმარებათ დაგეგმოთ, თვალი ადევნოთ და დაასრულოთ სამუშაო — ერთ სივრცეში.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {user ? (
            <Link to="/tasks" className="btn bg-white text-brand-700 hover:bg-brand-50">ჩემი ამოცანები →</Link>
          ) : (
            <>
              <Link to="/register" className="btn bg-white text-brand-700 hover:bg-brand-50">დაიწყეთ უფასოდ</Link>
              <Link to="/login" className="btn border border-white/60 text-white hover:bg-white/10">შესვლა</Link>
            </>
          )}
        </div>
      </section>

      {user && (
        <section aria-label="სტატისტიკა" className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <div className="text-3xl font-bold text-brand-600">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </section>
      )}

      <section>
        <h2 className="page-title text-center">რას გვთავაზობს TaskTarget</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card overflow-hidden">
              <OfficeImage alt={f.title} />
              <div className="p-6">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}