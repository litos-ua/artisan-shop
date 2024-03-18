
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer, Header } from '../../components';
import { rangeOfProducts } from '../../resources';
import {
    Paper, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer,
    Box, TableHead, TableRow,
} from '@mui/material';
import { ROUTE } from '../../router';

export const Products = () => {
    const { productKey } = useParams();
    const navigate = useNavigate();
    const productDetails = getProductDetails(productKey);

    if (!productDetails) {
        return (
            <Box>
                <Header />
                <Typography variant="body1">Product not found</Typography>
                <Footer />
            </Box>
        );
    }

    const { image, ItemCharacteristics, Price } = productDetails;

    const handleAddToCart = () => {
        navigate(`${ROUTE.CART}?productKey=${productKey}&price=${Price}&image=${image}`);
    };

    return (
        <Paper sx={{ padding: '1rem', marginBottom: '1rem' }}>
            <Header />
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <img src={image} alt={productKey} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Typography variant="h3" align="center" gutterBottom>{productKey}</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#adc4dc' }}>
                                    <TableCell>
                                        <Typography variant="h6">Characteristics</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">Value</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(ItemCharacteristics).map(([characteristic, value]) => (
                                    <TableRow key={characteristic} sx={{ height: '3rem'}}>
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
                    <Typography variant="h6" color="primary" align="center" gutterBottom>Price: {Price}</Typography>
                    <Grid container justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(ROUTE.HOME)}
                            sx={{ marginRight: '0.5rem' }}
                        >
                            Головна
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddToCart}
                        >
                            Додати в кошик
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </Paper>
    );
}

const getProductDetails = (productKey) => {
    const categories = Object.values(rangeOfProducts.categories);
    for (const category of categories) {
        const products = category.Products;
        if (products && productKey in products) {
            return products[productKey];
        }
    }
    return null;
};






