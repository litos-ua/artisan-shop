import React from 'react';
import { IconButton, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTE } from '../../router';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectIsAuthenticated } from '../../ducks/login.actions';

export function AuthButtons() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate(ROUTE.LOGIN);
    };

    const handleSignUp = () => {
        navigate(ROUTE.REGISTRATION);
    };

    const handleLogOut = () => {
        dispatch(logoutSuccess());
    };

    return (
        <Box className="authbuttons">
            {!isAuthenticated && (
                <>
                    <IconButton
                        color="inherit"
                        aria-label="login"
                        onClick={handleSignIn}
                        sx={{ marginRight: '0.5rem',  transform: 'scale(1.5)'}}
                    >
                        <LoginIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="signup"
                        onClick={handleSignUp}
                        sx={{ transform: 'scale(1.5)'}}
                    >
                        <PersonAddIcon />
                    </IconButton>
                </>
            )}
            {isAuthenticated && (
                <IconButton
                    color="inherit"
                    aria-label="logout"
                    onClick={handleLogOut}
                    sx={{ transform: 'scale(1.5)'}}
                >
                    <LogoutIcon />
                </IconButton>
            )}
        </Box>
    );
}

