

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { DropDownMenu } from './DropDownMenu';
// import { SearchForm } from './SearchForm';
// import { AuthButtons } from './AuthButtons';
// import { CartIcon } from './CartIcon';
// import HomeIcon from "@mui/icons-material/Home";
// import { getCategories } from "../../api"
// import { Typography, Box, IconButton, AppBar, Toolbar, Select, MenuItem } from "@mui/material";
// import { ROUTE } from "../../router";
//
// export function Header() {
//     const [categories, setCategories] = useState([]);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const categoriesData = await getCategories();
// //                console.log('categoriesData', categoriesData);
//                 setCategories(categoriesData);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//
//         fetchCategories();
//     }, []);
//
//     const handleLanguageChange = (language) => {
//         console.log('Selected Language:', language);
//     };
//
//     return (
//         <AppBar position="static">
//             <Toolbar>
//                 <Box className="header__dropdown_container"
//                      sx={{
//                          display: 'flex',
//                          justifyContent: 'space-between',
//                          alignItems: 'center',
//                          backgroundColor:'#9797', //marked dropdown area
//                          border: '1px solid #ddd',
//                          borderRadius: '1vw',
//                          marginRight: '2rem',
//                          pl: '1vw',
//                      }}
//                 >
//                     <DropDownMenu categories={categories} />
//                     <Typography variant="h6" noWrap
//                                 sx={{ flexGrow: 1,
//                                     display: { xs: 'none', sm: 'block' },
//                                     marginRight: 2, color: 'white' }}
//                     >
//                         Товари
//                     </Typography>
//                 </Box>
//
//                 <IconButton
//                     edge="start"
//                     color="inherit"
//                     aria-label="open drawer"
//                     sx={{
//                         color: 'white',
//                         cursor: 'pointer',
//                         transition: 'background-color 0.3s ease',
//                         whiteSpace: 'nowrap',
//                         transform: 'scale(1.5)',
//                     }}
//                     onClick={() => navigate(ROUTE.HOME)}
//                 >
//                     <HomeIcon />
//                 </IconButton>
//                 <SearchForm />
//                 <Select
//                     value="ua"
//                     onChange={(event) => handleLanguageChange(event.target.value)}
//                     sx={{
//                         backgroundColor: '#dea9a9',
//                         marginRight: '2%',
//                         marginLeft: '45%',
//                         height: '3vh',
//                         borderRadius: 4,
//                     }}
//                 >
//                     <MenuItem value="en">EN</MenuItem>
//                     <MenuItem value="ua">UA</MenuItem>
//                 </Select>
//                 <CartIcon />
//                 <AuthButtons />
//             </Toolbar>
//         </AppBar>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DropDownMenu } from './DropDownMenu';
import { SearchForm } from './SearchForm';
import { AuthButtons } from './AuthButtons';
import { CartIcon } from './CartIcon';
import HomeIcon from '@mui/icons-material/Home';
import { Typography, Box, IconButton, AppBar, Toolbar, Select, MenuItem } from '@mui/material';
import { ROUTE } from '../../router';
import { getCategories } from '../../api';
import { setCategories } from '../../ducks/categories.duck';

export function Header() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // The array of categories from the Redux store is read
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const isUnmounted = useRef(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                dispatch(setCategories(categoriesData));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        if (!categories.length) {
            fetchCategories();
        } else {
            setLoading(false);
        }

        // Clear categories on component unmount
        return () => {
            // Check if the component is being unmounted
            if (!isUnmounted.current) {
                dispatch(setCategories([]));
            }
        };

    }, [categories, dispatch]);



    useEffect(() => {
        // Update the ref when the component is unmounted
        return () => {
            isUnmounted.current = true;
        };
    }, []);


    const handleLanguageChange = (language) => {
        console.log('Selected Language:', language);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Box
                    className="header__dropdown_container"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#9797', //marked dropdown area
                        border: '1px solid #ddd',
                        borderRadius: '1vw',
                        marginRight: '2rem',
                        pl: '1vw',
                    }}
                >
                    <DropDownMenu categories={categories} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            marginRight: 2,
                            color: 'white',
                        }}
                    >
                        Товари
                    </Typography>
                </Box>

                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        whiteSpace: 'nowrap',
                        transform: 'scale(1.5)',
                    }}
                    onClick={() => navigate(ROUTE.HOME)}
                >
                    <HomeIcon />
                </IconButton>
                <SearchForm />
                <Select
                    value="ua"
                    onChange={(event) => handleLanguageChange(event.target.value)}
                    sx={{
                        backgroundColor: '#dea9a9',
                        marginRight: '2%',
                        marginLeft: '45%',
                        height: '3vh',
                        borderRadius: 4,
                    }}
                >
                    <MenuItem value="en">EN</MenuItem>
                    <MenuItem value="ua">UA</MenuItem>
                </Select>
                <CartIcon />
                <AuthButtons />
            </Toolbar>
        </AppBar>
    );
}















