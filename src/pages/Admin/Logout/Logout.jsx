import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout operations like clearing tokens
        navigate('/login');
    };

    return <div onClick={handleLogout}>Logout Component</div>;
};

export default Logout;
