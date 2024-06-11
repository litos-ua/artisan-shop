// import React from 'react';
// import { Paper, Typography, Button, Grid, Card, CardContent, CardMedia, CardActions, CardActionArea} from '@mui/material';
// import { useParams, useNavigate } from "react-router-dom";
// import { rangeOfProducts } from '../../resources';
// import {Footer, Header} from "../../components";
// import {ROUTE} from "../../router";
//
// export const SearchPage = () => {
//     const navigate = useNavigate();
//     const { searchParam } = useParams();
//
//     const filteredProducts = Object.entries(rangeOfProducts.categories)
//         .flatMap(([categoryKey, category]) =>
//             Object.entries(category.Products).map(([productKey, product]) => ({
//                 key: productKey,
//                 ...product
//             }))
//         )
//         .filter(product => {
//             return Object.values(product).some(value =>
//                 typeof value === 'string' && value.toLowerCase().includes(searchParam.toLowerCase())
//             );
//         });
//
//     const handleProductClick = (productKey) => {
//         navigate(`${ROUTE.PRODUCT_CURRENT.replace(":productKey", productKey)}`);
//     };
//
//     const handleAddToCart = (productKey, Price, image) => {
//         navigate(`${ROUTE.CART}?productKey=${productKey}&price=${Price}&image=${image}`);
//     };
//
//
//     return (
//         <Paper sx={{ backgroundColor: '#e7d3a9', padding: '1vh 1vw' }}>
//             <Header />
//             <Typography
//                 variant="h5"
//                 align="center"
//                 sx={{ p: '1vh 5vw 1vh 5vw' }}
//             >
//                 Search Results for "{searchParam}"
//             </Typography>
//             <Grid container spacing={3} sx={{ p: '1vh 5vw 1vh 5vw' }}>
//                 {filteredProducts.map(product => (
//                     <Grid item key={product.key} xs={12} sm={6} md={4}>
//                         <Card sx={{ backgroundColor: '#9ac7e0', p: '0vh' }}>
//                             <CardActionArea>
//                                 <CardMedia
//                                     onClick={() => handleProductClick(product.key)} style={{ cursor: 'pointer' }}
//                                     component="img"
//                                     image={product.image}
//                                     alt={product.key}
//                                     sx={{ height: '32vh', objectFit: 'cover', p: '1vh 1vh 1vh 1vh' }}
//                                 />
//                                 <CardContent sx={{ display: 'flex', justifyContent: 'space-between', p: '0 2vw 0 1vw' }}>
//                                     <Typography
//                                         onClick={() => handleProductClick(product.key)} style={{ cursor: 'pointer' }}
//                                         gutterBottom variant="h5"
//                                         component="div">
//                                         {product.key}
//                                     </Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         Ціна: {product.Price}
//                                     </Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                             <CardActions sx={{ justifyContent: 'center', p: '0' }}>
//                                 <Button
//                                     size="small" color="primary"
//                                     onClick={() => handleAddToCart(product.key, product.Price, product.image)}
//                                     style={{ cursor: 'pointer' }}
//                                 >
//                                     У кошик
//                                 </Button>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//             <Footer />
//         </Paper>
//     );
//
// };

import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Grid, Card, CardContent, CardMedia, CardActions, CardActionArea } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductsBySearchParam } from '../../api';
import { Footer, Header } from "../../components";
import { ROUTE } from "../../router";

export const SearchPage = () => {
    const navigate = useNavigate();
    const { searchParam } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchProductsBySearchParam(searchParam);
                setSearchResults(products);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchParam) {
            fetchData();
        }
    }, [searchParam]);

    const handleProductClick = (productKey) => {
        navigate(`${ROUTE.PRODUCT_CURRENT.replace(":productKey", productKey)}`);
    };

    const handleAddToCart = (productKey, Price, image) => {
        navigate(`${ROUTE.CART}?productKey=${productKey}&price=${Price}&image=${image}`);
    };

    return (
        <Paper sx={{ backgroundColor: '#e7d3a9', padding: '1vh 1vw' }}>
            <Header />
            <Typography
                variant="h5"
                align="center"
                sx={{ p: '1vh 5vw 1vh 5vw' }}
            >
                Search Results for "{searchParam}"
            </Typography>
            <Grid container spacing={3} sx={{ p: '1vh 5vw 1vh 5vw' }}>
                {searchResults.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#9ac7e0', p: '0vh' }}>
                            <CardActionArea>
                                <CardMedia
                                    onClick={() => handleProductClick(product.name)} style={{ cursor: 'pointer' }}
                                    component="img"
                                    image={`https://placehold.it/200x140/33bee5&text=${product.name}`}
                                    alt={product.id}
                                    sx={{ height: '32vh', objectFit: 'cover', p: '1vh 1vh 1vh 1vh' }}
                                />
                                <CardContent sx={{
                                    display: 'flex', justifyContent: 'space-between',
                                    p: '0 2vw 0 1vw'
                                }}>
                                    <Typography
                                        onClick={() => handleProductClick(product.name)} style={{ cursor: 'pointer' }}
                                        gutterBottom variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Ціна: {product.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ justifyContent: 'center', p: '0' }}>
                                <Button
                                    size="small" color="primary"
                                    onClick={() => handleAddToCart(product.id, product.price, product.image)} style={{ cursor: 'pointer' }}
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


