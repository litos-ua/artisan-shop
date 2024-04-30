
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTE } from './';


export const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={ROUTE.LOGIN} />;
    }
    return children; // If authenticated, render the children
};

export default PrivateRoute;

