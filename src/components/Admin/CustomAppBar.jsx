//import React from 'react';
// import { AppBar, UserMenu, MenuItemLink, useRedirect } from 'react-admin';
// import HomeIcon from '@mui/icons-material/Home';
// import { Button, Toolbar, Typography } from '@mui/material';
// import { ROUTE } from '../../router';
// import { useNavigate } from 'react-router-dom';
//
// export const CustomAppBar = (props) => {
//     const navigate = useNavigate();
//
//     return (
//         <AppBar {...props}
//                 sx={{
//                     color: 'lightblue',
//                     '& .RaAppBar-toolbar': { padding: '0 2vh', minHeight: '3vh', },
//                 }}
//         >
//             <Toolbar>
//                 <Typography variant="h6" color="inherit" className="title" id="react-admin-title" />
//                 <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate(ROUTE.HOME)}>
//                     Home
//                 </Button>
//                 <UserMenu />
//             </Toolbar>
//         </AppBar>
//     );
// };

import React from 'react';
import { AppBar, UserMenu } from 'react-admin';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../router';

export const CustomAppBar = (props) => {
    const navigate = useNavigate();

    return (
        <AppBar {...props} sx={{ color: 'lightblue', height:'6vh' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="inherit" className="title" id="react-admin-title" />
                <Box sx={{ display: 'flex', alignItems: 'right', gap: 1, marginLeft: '70vw' }}>
                    {/*<Button color="inherit" startIcon={<RefreshIcon />} onClick={() => window.location.reload()}>*/}
                    {/*    Refresh*/}
                    {/*</Button>*/}
                    <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate(ROUTE.HOME)}>
                        Home
                    </Button>
                    <UserMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
};
