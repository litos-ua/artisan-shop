
// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { DropDownMenu } from './DropDownMenu';
// import { SearchForm } from './SearchForm';
// import { AuthButtons } from './AuthButtons';
// import { CartIcon } from './CartIcon';
// import HomeIcon from '@mui/icons-material/Home';
// import { Typography, Box, IconButton, AppBar, Toolbar, Select, MenuItem } from '@mui/material';
// import { ROUTE } from '../../router';
// import { fetchCategories } from '../../api';
// import { setCategories } from '../../ducks';
// import { clearProductsByCategory } from '../../ducks'
//
// export function Header() {
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const categories = useSelector((state) => state.categories);
//     const dispatch = useDispatch();
//
//     const isUnmounted = useRef(false);
//
//     useEffect(() => {
//         const getCategories = async () => {
//             try {
//                 const categoriesData = await fetchCategories();
//                 dispatch(setCategories(categoriesData));
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setLoading(false);
//             }
//         };
//
//         if (!categories.length) {
//             getCategories();
//         } else {
//             setLoading(false);
//         }
//
//         // Clear categories on component unmount
//         return () => {
//             if (!isUnmounted.current) {
//                 dispatch(setCategories([]));
//                 dispatch(clearProductsByCategory());
//             }
//         };
//
//     }, [categories, dispatch]);
//
//
//     // Update the ref when the component is unmounted
//     useEffect(() => {
//         return () => {
//             isUnmounted.current = true;
//         };
//     }, []);
//
//
//     const handleLanguageChange = (language) => {
//         console.log('Selected Language:', language);
//     };
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <AppBar position="static">
//             <Toolbar>
//                 <Box
//                     className="header__dropdown_container"
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         backgroundColor: '#9797', //marked dropdown area
//                         border: '1px solid #ddd',
//                         borderRadius: '1vw',
//                         marginRight: '2rem',
//                         pl: '1vw',
//                     }}
//                 >
//                     <DropDownMenu categories={categories} />
//                     <Typography
//                         variant="h6"
//                         noWrap
//                         sx={{
//                             flexGrow: 1,
//                             display: { xs: 'none', sm: 'block' },
//                             marginRight: 2,
//                             color: 'white',
//                         }}
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


// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { DropDownMenu } from './DropDownMenu';
// import { SearchForm } from './SearchForm';
// import { AuthButtons } from './AuthButtons';
// import { CartIcon } from './CartIcon';
// import HomeIcon from '@mui/icons-material/Home';
// import { Typography, Box, IconButton, AppBar, Toolbar, Select, MenuItem } from '@mui/material';
// import { ROUTE } from '../../router';
// import { fetchCategories } from '../../api';
// import { setCategories } from '../../ducks';
// import { clearProductsByCategory } from '../../ducks'
//
// export function Header() {
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const categories = useSelector((state) => state.categories);
//     const dispatch = useDispatch();
//
//     const isUnmounted = useRef(false);
//
//     useEffect(() => {
//         const getCategories = async () => {
//             try {
//                 const categoriesData = await fetchCategories();
//                 dispatch(setCategories(categoriesData));
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setLoading(true); //false
//             }
//         };
//
//         console.log('categoriesMenu:', categories);
//         console.log('length:', categories.length)
//
//         if (!categories.length) {//if (categories.length == 0) {
//             getCategories();
//             console.log('categoriesGet:', categories);
//         } else {
//             setLoading(false);
//         }
//
//         // Clear categories on component unmount !!!!!!!!!
//         return () => {
//             if (!isUnmounted.current) {
//                 dispatch(setCategories([]));
//                 dispatch(clearProductsByCategory());
//             }
//         };
//
//     }, [dispatch]);   //[categories, dispatch] - error 185
//
//
//     // useEffect(() => {
//     //     const getCategories = async () => {
//     //         try {
//     //             const categoriesData = await fetchCategories();
//     //             if (!isUnmounted.current) {
//     //                 dispatch(setCategories(categoriesData));
//     //                 setLoading(false);
//     //             }
//     //         } catch (error) {
//     //             console.error('Error fetching categories:', error);
//     //             setLoading(false);
//     //         }
//     //     };
//     //
//     //     if (categories.length === 0) {
//     //         getCategories();
//     //     } else {
//     //         setLoading(false);
//     //     }
//     //
//     //     return () => {
//     //         isUnmounted.current = true;
//     //     };
//     // }, [dispatch]);
//
//     useEffect(() => {
//         return () => {
//             if (!isUnmounted.current) {
//                 dispatch(setCategories([]));
//                 dispatch(clearProductsByCategory());
//             }
//         };
//     }, [dispatch]);
//
//
//     // Update the ref when the component is unmounted
//     useEffect(() => {
//         return () => {
//             isUnmounted.current = true;
//         };
//     }, []);
//
//
//     const handleLanguageChange = (language) => {
//         console.log('Selected Language:', language);
//     };
//
//     console.log('Categories_Header:', categories);
//     if (loading && categories) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <AppBar position="static">
//             <Toolbar>
//                 <Box
//                     className="header__dropdown_container"
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         backgroundColor: '#9797', //marked dropdown area
//                         border: '1px solid #ddd',
//                         borderRadius: '1vw',
//                         marginRight: '2rem',
//                         pl: '1vw',
//                     }}
//                 >
//                     <DropDownMenu categories={categories} />
//                     <Typography
//                         variant="h6"
//                         noWrap
//                         sx={{
//                             flexGrow: 1,
//                             display: { xs: 'none', sm: 'block' },
//                             marginRight: 2,
//                             color: 'white',
//                         }}
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
import { fetchCategories } from '../../api';
import { setCategories } from '../../ducks';
import { clearProductsByCategory } from '../../ducks'

export function Header() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const isUnmounted = useRef(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                dispatch(setCategories(categoriesData));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(true); //false
            }
        };

        //console.log('categoriesMenu:', categories);
        //console.log('length:', categories.length)

        if (!categories.length) {//if (categories.length == 0) {
            getCategories();
            console.log('categoriesGet:', categories);
        } else {
            setLoading(false);
        }

        // Clear categories on component unmount !!!!!!!!!
        return () => {
            if (!isUnmounted.current) {
                dispatch(setCategories([]));
                dispatch(clearProductsByCategory());
            }
        };

    }, [dispatch]);   //[categories, dispatch] - error 185 [dispatch, categories.length]


    useEffect(() => {
        return () => {
            if (!isUnmounted.current) {
                dispatch(setCategories([]));
                dispatch(clearProductsByCategory());
            }
        };
    }, [dispatch]);


    // Update the ref when the component is unmounted
    useEffect(() => {
        return () => {
            isUnmounted.current = true;
        };
    }, []);


    const handleLanguageChange = (language) => {
        console.log('Selected Language:', language);
    };

    //console.log('Categories_Header:', categories);
    if (loading && categories.length) {
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
                    {categories.length > 0 ? (
                        <DropDownMenu categories={categories} />
                    ) : (
                        <Typography variant="h5" align="center" sx={{ p: '1vh 5vw',fontSize: "14px" }}>
                            Loading...
                        </Typography>
                    )}
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














