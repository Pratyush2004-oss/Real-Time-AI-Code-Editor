import { Navigate, Outlet } from "react-router-dom";
import { useAuthSelector } from "../../features/auth/store/hooks";

const PublicRoute = () => {
    const user = useAuthSelector((state) => state.user.userData);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;