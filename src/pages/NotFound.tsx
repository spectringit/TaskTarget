import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-6xl font-extrabold text-brand-600">404</p>
      <p className="my-4 text-slate-500">გვერდი ვერ მოიძებნა.</p>
      <Link to="/" className="btn btn-primary">მთავარზე დაბრუნება</Link>
    </div>
  )
}
