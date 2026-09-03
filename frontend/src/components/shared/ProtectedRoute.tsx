import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../features/auth/store/hooks'
const ProtectedRoute = () => {
    const user = useAppSelector((state) => state.user.userData);
    if (!user) return (
        <Navigate to={"/login"} replace />
    )
    return (
        <Outlet />
    )
}

export default ProtectedRoute;