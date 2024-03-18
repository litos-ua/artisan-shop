import React from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../router';
import { selectCart } from '../../ducks';

export const CartIcon = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCart);
    const uniqueItemCount = new Set(cartItems.map(item => item.productKey)).size;
    const handleCartClick = () => {
        navigate(ROUTE.CART);
    };

    return (
        <Badge badgeContent={uniqueItemCount}
               color="error"
               sx={{mr: '3vw'}}
        >
            <IconButton
                className="cart-icon"
                onClick={handleCartClick}
                aria-label="cart"
                sx={{ padding: 0, transform: 'scale(1.4)', }}
            >
            <ShoppingCartOutlinedIcon />
        </IconButton>
        </Badge>
    );
};
