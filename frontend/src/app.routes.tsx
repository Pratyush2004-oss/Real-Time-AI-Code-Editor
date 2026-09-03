import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import DashboardPage from "./features/projects/pages/DashboardPage";
import PublicRoute from "./components/shared/PublicRoute";

const RootLayout = () => (
    <>
        <Outlet />
    </>
)
export const Router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />
                    },
                ]
            },
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                ],
            },
            {
                path: "*",
                element: <div>Page not found</div>
            }
        ]
    }
])