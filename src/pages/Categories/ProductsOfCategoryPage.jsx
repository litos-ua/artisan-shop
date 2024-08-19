

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Grid, Card, CardContent, CardMedia, CardActions, CardActionArea, Typography, Button } from '@mui/material';
import { Footer, Header } from '../../components';
import { ROUTE } from '../../router';
import { fetchProductsByCategory } from "../../api";
import { setProductsByCategory } from '../../ducks';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const checkImageExists = async (url) => {
    try {
        const response = await axios.head(url);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export const ProductsOfCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productsByCategory = useSelector(state => state.productsByCategory);
    const categories = useSelector(state => state.categories);

    const categoryObj = categories.find(cat => cat.id === parseInt(category));
    const categoryData = categoryObj ?? { id: 9, name: 'Communication gates' };

    const [imagesExist, setImagesExist] = useState({});
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchCategoryData = async () => {
            setLoading(true);
            if (!productsByCategory[category]) {
                try {
                    const products = await fetchProductsByCategory(category);
                    dispatch(setProductsByCategory({ categoryId: category, products }));
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
            setLoading(false);
        };

        if (category) {
            fetchCategoryData();
        }
    }, [category, dispatch, productsByCategory]);

    useEffect(() => {
        const checkImages = async () => {
            const results = {};
            for (const product of productsByCategory[category] || []) {
                const exists = await checkImageExists(product.image);
                results[product.id] = exists;
            }
            setImagesExist(results);
        };

        if (productsByCategory[category]) {
            checkImages();
        }
    }, [category, productsByCategory]);

    const handleProductClick = (productKey) => {
        navigate(`${ROUTE.PRODUCT_CURRENT.replace(":productKey", productKey)}`);
    };

    const handleAddToCart = (productKey, price, image) => {
        navigate(`${ROUTE.CART}?productKey=${productKey}&price=${price}&image=${image}`);
    };

    if (!category) {
        return <p>Category not found</p>;
    }

    const products = productsByCategory[category] || [];

    if (!products) {
        return <p>No products available</p>;
    }

    return (
        <Paper sx={{ backgroundColor: '#e7d3a9', padding: '1vh 1vw' }}>
            <Header />
            {categoryData && (
                <Typography variant="h3" align="center" sx={{ p: '1vh 5vw 1vh 5vw' }}>
                    {t('category')}: {categoryData.name}
                </Typography>
            )}
            {loading ? (
                <Typography variant="h5" align="center" sx={{ p: '1vh 5vw' }}>
                    Loading products...
                </Typography>
            ) : (
                products.length > 0 ? (
                    <Grid container spacing={3} sx={{ p: '1vh 5vw 1vh 5vw' }}>
                        {products.map(product => (
                            <Grid item key={product.id} xs={12} sm={6} md={4}>
                                <Card sx={{ backgroundColor: '#9ac7e0', p: '0vh' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            onClick={() => handleProductClick(product.id)}
                                            style={{ cursor: 'pointer' }}
                                            component="img"
                                            image={imagesExist[product.id] ? product.image.replace(/img/, 'imgsmall') : `https://placehold.it/200x140/33bee5&text=${product.name}`}
                                            alt={product.name}
                                            sx={{ height: '32vh', objectFit: 'cover', p: '1vh 1vh 1vh 1vh' }}
                                        />
                                        <CardContent sx={{
                                            display: 'flex', justifyContent: 'space-between',
                                            p: '0 2vw 0 1vw'
                                        }}>
                                            <Typography
                                                onClick={() => handleProductClick(product.id)}
                                                style={{ cursor: 'pointer' }}
                                                gutterBottom variant="h5" component="div">
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('price')}: {product.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions sx={{ justifyContent: 'center', p: '0' }}>
                                        <Button
                                            size="small" color="primary"
                                            onClick={() => handleAddToCart(product.name, product.price, product.image)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {t('addToCart')}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h5" align="center" sx={{ p: '1vh 5vw' }}>
                        {t('productAvailable')}
                    </Typography>
                )
            )}
            <Footer />
        </Paper>
    );
};

