

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { Footer, Header } from '../../components';
import { ROUTE } from '../../router';
import { getProductById } from '../../api';
import { setProductDetails } from '../../ducks';
import { useTranslation } from 'react-i18next';

export const Products = () => {
    const { productKey } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails[productKey]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productDetails) {
                try {
                    const product = await getProductById(productKey);
                    dispatch(setProductDetails({ productKey, product }));
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, [productDetails, productKey, dispatch]);

    const handleAddToCart = (itemName) => {
        navigate(`${ROUTE.CART}?productKey=${itemName}&price=${Price}&image=${image}`)
    };

    if (!productDetails) {
        return (
            <Box>
                <Header />
                <Typography variant="body1">{t('productNotFound')}</Typography>
                <Footer />
            </Box>
        );
    }

//    const { image, ItemCharacteristics, Price } = productDetails;
    const { name: itemName, image, item_characteristics: ItemCharacteristics, price: Price } = productDetails;

    return (
        <Paper sx={{ padding: '1rem', marginBottom: '1rem' }}>
            <Header />
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <img src={image} alt={productKey} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Typography variant="h3" align="center" gutterBottom>{itemName}</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#adc4dc' }}>
                                    <TableCell>
                                        <Typography variant="h6">{t('productCharacteristics')}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">{t('productValue')}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(ItemCharacteristics).map(([characteristic, value]) => (
                                    <TableRow key={characteristic} sx={{ height: '3rem' }}>
                                        <TableCell sx={{ p: '0.5rem' }}>
                                            <Typography>{characteristic}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ p: '0.5rem' }}>
                                            <Typography>{value}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h6" color="primary" align="center" gutterBottom>{t('price')}: {Price}</Typography>
                    <Grid container justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(ROUTE.HOME)}
                            sx={{ marginRight: '0.5rem' }}
                        >
                            {t('home')}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            // onClick={handleAddToCart}
                            onClick={() => handleAddToCart(itemName)}
                        >
                            {t('addToCart')}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </Paper>
    );
};





