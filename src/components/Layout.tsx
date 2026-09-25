import { useState, type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout, selectCurrentUser } from '../redux/authSlice'

const links = [
  { to: '/', label: 'მთავარი', end: true },
  { to: '/tasks', label: 'ამოცანები' },
  { to: '/about', label: 'ჩვენს შესახებ' },
  { to: '/contact', label: 'კონტაქტი' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-700" aria-label="TaskTarget — მთავარი">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">✓</span>
      TaskTarget
    </Link>
  )
}

function Header() {
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const cls = ({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <button className="btn btn-ghost md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="მენიუ">
          ☰
        </button>
        <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-1 border-b border-slate-200 bg-white p-4 md:static md:flex md:flex-row md:items-center md:border-0 md:p-0`}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={cls} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <span className="hidden h-6 w-px bg-slate-200 md:mx-2 md:block" />
          {user ? (
            <>
              <span className="px-3 py-2 text-sm text-slate-500">👤 {user.name}</span>
              <button className="btn btn-ghost" onClick={() => { dispatch(logout()); setOpen(false); navigate('/') }}>გასვლა</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={cls} onClick={() => setOpen(false)}>შესვლა</NavLink>
              <Link to="/register" className="btn btn-primary" onClick={() => setOpen(false)}>რეგისტრაცია</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-slate-500">მარტივი და სწრაფი ამოცანების მენეჯერი სასწავლო პროექტისთვის.</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">ნავიგაცია</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {links.map((l) => (
              <li key={l.to}><Link className="hover:text-brand-600" to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">კონტაქტი</h3>
          <p className="text-sm text-slate-600">info@tasktarget.example</p>
          <p className="text-sm text-slate-600">თბილისი, საქართველო</p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">© {new Date().getFullYear()} TaskTarget. ყველა უფლება დაცულია.</div>
    </footer>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
