// import React from 'react';
// import { Container, Box } from '@mui/material';
// import { ErrorBoundary, Header } from "../../components";
//
// export function BaseAccountLayout({ children }) {
//     return (
//         <ErrorBoundary>
//             <Box>
//                 <Header />
//                 {/* Main Content Section */}
//                 <Container>
//                     {children}
//                     {/* Add additional main content here */}
//                 </Container>
//             </Box>
//         </ErrorBoundary>
//     );
// }

import React from 'react';
import { Container, Box, Grid, MenuItem, Typography } from '@mui/material';
import { ErrorBoundary, Header } from "../../components";
import { useNavigate } from 'react-router-dom';

export function BaseAccountLayout({ children }) {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <ErrorBoundary>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <Container sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <MenuItem onClick={() => handleNavigation('/')}>
                                Home
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('/Dashboard')}>
                                Dashboard
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('/Cart')}>
                                Cart
                            </MenuItem>
                            {/* Add more menu items as needed */}
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>Grid item for the main content</Typography>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ErrorBoundary>
    );
}










