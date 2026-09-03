import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../features/auth/store/hooks";

const PublicRoute = () => {
    const user = useAppSelector((state) => state.user.userData);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;