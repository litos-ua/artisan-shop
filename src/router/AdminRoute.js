import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated, selectUserRole } from '../ducks';

export const AdminRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userRole = useSelector(selectUserRole);

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    if (userRole !== 3) { // Assuming 1 is the admin role
        return <Navigate to="/unauthorized"/>;
    }

    return children;
};