import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentUser } from '../redux/authSlice'
import { useAppSelector } from '../redux/hooks'

export default function ProtectedRoute() {
  const user = useAppSelector(selectCurrentUser)
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
