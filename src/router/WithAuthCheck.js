import { useSelector } from 'react-redux';
import { ROUTE } from './index'
import {Navigate} from "react-router-dom";

export const WithAuthCheck = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={ROUTE.LOGIN} />;
    }
    return children; // If authenticated, render the children
};
export default WithAuthCheck;