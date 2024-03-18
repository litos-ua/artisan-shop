
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DropDownMenu } from './DropDownMenu';
import { SearchForm } from './SearchForm';
import { AuthButtons } from './AuthButtons';
import { CartIcon } from './CartIcon';
import HomeIcon from "@mui/icons-material/Home";
import { rangeOfProducts } from '../../resources';
import { Typography, Box, IconButton, AppBar, Toolbar, Select, MenuItem } from "@mui/material";
import { ROUTE } from "../../router";

export function Header() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const categoriesArray = Object.keys(rangeOfProducts.categories);
        setCategories(categoriesArray);
    }, []);

    const handleLanguageChange = (language) => {
        console.log('Selected Language:', language);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box className="header__dropdown_container"
                     sx={{
                         display: 'flex',
                         justifyContent: 'space-between',
                         alignItems: 'center',
                         backgroundColor:'#9797', //marked dropdown area
                         border: '1px solid #ddd',
                         borderRadius: '1vw',
                         marginRight: '2rem',
                         pl: '1vw',
                     }}
                >
                    <DropDownMenu categories={categories} />
                    <Typography variant="h6" noWrap
                                sx={{ flexGrow: 1,
                                    display: { xs: 'none', sm: 'block' },
                                    marginRight: 2, color: 'white' }}
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














