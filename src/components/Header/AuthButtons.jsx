// import React from 'react';
// import { IconButton, Box, Tooltip } from '@mui/material';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { ROUTE } from '../../router';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutSuccess, selectIsAuthenticated } from '../../ducks';
//
// export function AuthButtons() {
//     const dispatch = useDispatch();
//     const isAuthenticated = useSelector(selectIsAuthenticated);
//     const navigate = useNavigate();
//
//     const handleSignIn = () => {
//         navigate(ROUTE.LOGIN);
//     };
//
//     const handleSignUp = () => {
//         navigate(ROUTE.REGISTRATION);
//     };
//
//     const handleDashboard = () => {
//         navigate(ROUTE.DASHBOARD);
//     };
//
//     const handleAccount = () => {
//         navigate(ROUTE.CUSTOMER_ACCOUNT);
//     };
//
//     const handleLogOut = () => {
//         dispatch(logoutSuccess());
//     };
//
//     return (
//         <Box className="authbuttons">
//             {!isAuthenticated && (
//                 <>
//                     <Tooltip title="Login">
//                         <IconButton
//                             color="inherit"
//                             aria-label="login"
//                             onClick={handleSignIn}
//                             sx={{ marginRight: '0.5rem', transform: 'scale(1.5)' }}
//                         >
//                             <LoginIcon />
//                         </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Sign Up">
//                         <IconButton
//                             color="inherit"
//                             aria-label="signup"
//                             onClick={handleSignUp}
//                             sx={{ transform: 'scale(1.5)' }}
//                         >
//                             <PersonAddIcon />
//                         </IconButton>
//                     </Tooltip>
//                 </>
//             )}
//             {isAuthenticated && (
//                 <>
//                     <Tooltip title="Account">
//                         <IconButton
//                             color="inherit"
//                             aria-label="account"
//                             onClick={handleAccount}
//                             sx={{ marginRight: '0.5rem', transform: 'scale(1.5)' }}
//                         >
//                             <AccountCircleIcon />
//                         </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Logout">
//                         <IconButton
//                             color="inherit"
//                             aria-label="logout"
//                             onClick={handleLogOut}
//                             sx={{ transform: 'scale(1.5)' }}
//                         >
//                             <LogoutIcon />
//                         </IconButton>
//                     </Tooltip>
//                 </>
//             )}
//         </Box>
//     );
// }

// src/components/AuthButtons.jsx

import React from 'react';
import { IconButton, Box, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROUTE } from '../../router';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectIsAuthenticated, selectUserRole } from '../../ducks';

export function AuthButtons() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userRole = useSelector(selectUserRole); // Get the user's role
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate(ROUTE.LOGIN);
    };

    const handleSignUp = () => {
        navigate(ROUTE.REGISTRATION);
    };

    // const handleDashboard = () => {
    //     navigate(ROUTE.DASHBOARD);
    // };

    const handleAccount = () => {
        if (userRole === 3) {
            navigate(ROUTE.DASHBOARD); // Admin role
        } else {
            navigate(ROUTE.CUSTOMER_ACCOUNT); // Other roles
        }
    };

    const handleLogOut = () => {
        dispatch(logoutSuccess());
    };

    return (
        <Box className="authbuttons">
            {!isAuthenticated && (
                <>
                    <Tooltip title="Login">
                        <IconButton
                            color="inherit"
                            aria-label="login"
                            onClick={handleSignIn}
                            sx={{ marginRight: '0.5rem', transform: 'scale(1.5)' }}
                        >
                            <LoginIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sign Up">
                        <IconButton
                            color="inherit"
                            aria-label="signup"
                            onClick={handleSignUp}
                            sx={{ transform: 'scale(1.5)' }}
                        >
                            <PersonAddIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
            {isAuthenticated && (
                <>
                    <Tooltip title="Account">
                        <IconButton
                            color="inherit"
                            aria-label="account"
                            onClick={handleAccount}
                            sx={{ marginRight: '0.5rem', transform: 'scale(1.5)' }}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <IconButton
                            color="inherit"
                            aria-label="logout"
                            onClick={handleLogOut}
                            sx={{ transform: 'scale(1.5)' }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Box>
    );
}



