
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rangeOfProducts } from '../../resources';
import { Footer, Header } from "../../components";
import { Paper, Grid, Card, CardContent, CardMedia, CardActions, CardActionArea,
         Typography, Button } from '@mui/material';
import {ROUTE} from "../../router";


export const ProductsOfCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const categoryData = rangeOfProducts.categories[category];

    if (!categoryData) {
        return <p>Category not found</p>;
    }

    const products = Object.entries(categoryData.Products).map(([productKey, productData]) => ({
        productKey,
        ...productData
    }));

    const handleProductClick = (productKey) => {
        navigate(`${ROUTE.PRODUCT_CURRENT.replace(":productKey", productKey)}`);
    };

    const handleAddToCart = (productKey, Price, image) => {
        navigate(`${ROUTE.CART}?productKey=${productKey}&price=${Price}&image=${image}`);
    };

    return (
        <Paper sx={{ backgroundColor: '#e7d3a9', padding: '1vh 1vw' }}>
            <Header />
            <Typography variant="h3" align="center" sx={{p: '1vh 5vw 1vh 5vw' }}>Category: {category}</Typography>
            <Grid container spacing={3} sx={{p: '1vh 5vw 1vh 5vw' }}>
                {products.map(product => (
                    <Grid item key={product.productKey} xs={12} sm={6} md={4} >
                        <Card sx={{backgroundColor: '#9ac7e0', p: '0vh' }}>
                            <CardActionArea >
                                <CardMedia
                                    onClick={() => handleProductClick(product.productKey)} style={{ cursor: 'pointer' }}
                                    component="img"
                                    image= {`https://placehold.it/200x140/33bee5&text=${product.productKey}`}//{product.image.replace('/img/', '/imgsmall/')}
                                    alt={product.productKey}
                                    sx={{ height: '32vh', objectFit: 'cover', p: '1vh 1vh 1vh 1vh' }}
                                />
                                <CardContent sx={{display: 'flex', justifyContent: 'space-between',
                                             p: '0 2vw 0 1vw'}}>
                                    <Typography
                                        onClick={() => handleProductClick(product.productKey)} style={{ cursor: 'pointer' }}
                                        gutterBottom variant="h5" component="div">
                                        {product.productKey}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ціна: {product.Price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{justifyContent: 'center', p: '0'}}>
                                <Button
                                    size="small" color="primary"
                                    onClick={() => handleAddToCart
                                    (product.productKey, product.Price,product.image )} style={{ cursor: 'pointer' }}
                                >
                                    У кошик
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </Paper>
    );
};





