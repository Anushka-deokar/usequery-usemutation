import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
