import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return <div onClick={handleLogout}>Logout Component</div>;
};

export default Logout;
