
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










