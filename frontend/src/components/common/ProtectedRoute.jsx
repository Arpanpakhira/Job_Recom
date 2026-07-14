import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuthStore();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-950">
                <Loader />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
