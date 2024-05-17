// import React, { useEffect, useState } from 'react';
// import { getOrdersOfCustomer } from '../../api';
// import {
//         Accordion, AccordionSummary,
//         AccordionDetails, Box,
//         Typography, Table,
//         TableBody, TableCell,
//         TableContainer, TableHead,
//         TableRow, Paper,
//         Collapse, IconButton, Pagination
//     } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//
//
// const CustomerOrdersList = () => {
//     const [orders, setOrders] = useState([]);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//
//     const handleExpandClick = (orderId) => {
//         setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//     };
//
//     useEffect(() => {
//         fetchOrders();
//     }, []);
//
//     const fetchOrders = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const ordersData = await getOrdersOfCustomer('/customer/orders', { Authorization: `Bearer ${token}` });
//             setOrders(ordersData);
//             console.log('ordersData:',ordersData);
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//             // Handle error
//         }
//     };
//
//     return (
//         <Box>
//             <Typography variant="h5" gutterBottom>List of Orders</Typography>
//             {orders.map(order => (
//                 <Accordion key={order.id} style={{ marginBottom: '16px' }}>
//                     <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls={`panel${order.id}-content`}
//                         id={`panel${order.id}-header`}
//                     >
//                         <Typography variant="h6">Order ID: {order.id}</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Box style={{ width: '100%' }}>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Payment Status: {order.payment_status}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Type of Payment: {order.type_of_payment}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Delivery Requirement: {order.delivery_requirement}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Date: {new Date(order.updated_at).toLocaleString()}
//                             </Typography>
//
//                             <Typography variant="subtitle1" component="h3" gutterBottom>
//                                 Order Details:
//                                 <IconButton
//                                     onClick={() => handleExpandClick(order.id)}
//                                     aria-expanded={expandedOrderId === order.id}
//                                     aria-label="show more"
//                                 >
//                                     <ExpandMoreIcon />
//                                 </IconButton>
//                             </Typography>
//
//                             <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
//                                 <TableContainer component={Paper}>
//                                     <Table aria-label="order details table">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Product</TableCell>
//                                                 <TableCell align="right">Quantity</TableCell>
//                                                 <TableCell align="right">Price</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {order.order_details.map((detail, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell component="th" scope="row">
//                                                         {detail.product_name}
//                                                     </TableCell>
//                                                     <TableCell align="right">{detail.quantity}</TableCell>
//                                                     <TableCell align="right">${detail.price}</TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </Collapse>
//
//                             <Typography variant="h6" component="p" style={{ marginTop: '16px' }}>
//                                 Total Amount: ${order.total_amount}
//                             </Typography>
//                         </Box>
//                     </AccordionDetails>
//                 </Accordion>
//             ))}
//         </Box>
//     );
// };
//
// export default CustomerOrdersList;



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrders } from '../../ducks';
// import {
//     Accordion, AccordionSummary, AccordionDetails, Box, Typography, Table, TableBody,
//     TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton, Pagination
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//
// const CustomerOrdersList = () => {
//     const dispatch = useDispatch();
//     const { orders, status, error } = useSelector(state => state.orders);
//     const [expandedOrderId, setExpandedOrderId] = React.useState(null);
//
//     useEffect(() => {
//         dispatch(fetchOrders());
//     }, [dispatch]);
//
//     const handleExpandClick = (orderId) => {
//         setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//     };
//
//     if (status === 'loading') {
//         return <p>Loading...</p>;
//     }
//
//     if (status === 'failed') {
//         return <p>Error: {error}</p>;
//     }
//
//     return (
//         <Box>
//             <Typography variant="h5" gutterBottom>List of Orders</Typography>
//             {orders.map(order => (
//                 <Accordion key={order.id} style={{ marginBottom: '16px' }}>
//                     <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls={`panel${order.id}-content`}
//                         id={`panel${order.id}-header`}
//                     >
//                         <Typography variant="h6">Order ID: {order.id}</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Box style={{ width: '100%' }}>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Payment Status: {order.payment_status}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Type of Payment: {order.type_of_payment}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Delivery Requirement: {order.delivery_requirement}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Date: {new Date(order.updated_at).toLocaleString()}
//                             </Typography>
//
//                             <Typography variant="subtitle1" component="h3" gutterBottom>
//                                 Order Details:
//                                 <IconButton
//                                     onClick={() => handleExpandClick(order.id)}
//                                     aria-expanded={expandedOrderId === order.id}
//                                     aria-label="show more"
//                                 >
//                                     <ExpandMoreIcon />
//                                 </IconButton>
//                             </Typography>
//
//                             <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
//                                 <TableContainer component={Paper}>
//                                     <Table aria-label="order details table">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Product</TableCell>
//                                                 <TableCell align="right">Quantity</TableCell>
//                                                 <TableCell align="right">Price</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {order.order_details.map((detail, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell component="th" scope="row">
//                                                         {detail.product_name}
//                                                     </TableCell>
//                                                     <TableCell align="right">{detail.quantity}</TableCell>
//                                                     <TableCell align="right">${detail.price}</TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </Collapse>
//
//                             <Typography variant="h6" component="p" style={{ marginTop: '16px' }}>
//                                 Total Amount: ${order.total_amount}
//                             </Typography>
//                         </Box>
//                     </AccordionDetails>
//                 </Accordion>
//             ))}
//         </Box>
//     );
// };
//
// export default CustomerOrdersList;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchOrders } from '../../ducks';
// import {
//     Accordion, AccordionSummary,
//     AccordionDetails, Box,
//     Typography, Table,
//     TableBody, TableCell,
//     TableContainer, TableHead,
//     TableRow, Paper,
//     Collapse, IconButton, Pagination
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//
// const CustomerOrdersList = () => {
//     const dispatch = useDispatch();
//     const { orders, status, error } = useSelector((state) => state.orders);
//     const [expandedOrderId, setExpandedOrderId] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const ordersPerPage = 5;
//
//     useEffect(() => {
//         dispatch(fetchOrders());
//     }, [dispatch]);
//
//     const handleExpandClick = (orderId) => {
//         setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//     };
//
//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };
//
//     // Calculate the orders to display on the current page
//     const indexOfLastOrder = currentPage * ordersPerPage;
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//     const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
//
//     return (
//         <Box>
//             <Typography variant="h5" gutterBottom>List of Orders</Typography>
//             {currentOrders.map(order => (
//                 <Accordion key={order.id} style={{ marginBottom: '16px' }}>
//                     <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls={`panel${order.id}-content`}
//                         id={`panel${order.id}-header`}
//                     >
//                         <Typography variant="h6">Order ID: {order.id}</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Box style={{ width: '100%' }}>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Payment Status: {order.payment_status}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Type of Payment: {order.type_of_payment}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Delivery Requirement: {order.delivery_requirement}
//                             </Typography>
//                             <Typography color="textSecondary" gutterBottom>
//                                 Date: {new Date(order.updated_at).toLocaleString()}
//                             </Typography>
//
//                             <Typography variant="subtitle1" component="h3" gutterBottom>
//                                 Order Details:
//                                 <IconButton
//                                     onClick={() => handleExpandClick(order.id)}
//                                     aria-expanded={expandedOrderId === order.id}
//                                     aria-label="show more"
//                                 >
//                                     <ExpandMoreIcon />
//                                 </IconButton>
//                             </Typography>
//
//                             <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
//                                 <TableContainer component={Paper}>
//                                     <Table aria-label="order details table">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Product</TableCell>
//                                                 <TableCell align="right">Quantity</TableCell>
//                                                 <TableCell align="right">Price</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {order.order_details.map((detail, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell component="th" scope="row">
//                                                         {detail.product_name}
//                                                     </TableCell>
//                                                     <TableCell align="right">{detail.quantity}</TableCell>
//                                                     <TableCell align="right">${detail.price}</TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </Collapse>
//
//                             <Typography variant="h6" component="p" style={{ marginTop: '16px' }}>
//                                 Total Amount: ${order.total_amount}
//                             </Typography>
//                         </Box>
//                     </AccordionDetails>
//                 </Accordion>
//             ))}
//             <Box display="flex" justifyContent="center" style={{ marginTop: '1vh' }}>
//                 <Pagination
//                     count={Math.ceil(orders.length / ordersPerPage)}
//                     page={currentPage}
//                     onChange={handlePageChange}
//                 />
//             </Box>
//         </Box>
//     );
// };
//
// export default CustomerOrdersList;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../ducks';
import {
    Accordion, AccordionSummary,
    AccordionDetails, Box,
    Typography, Table,
    TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Paper,
    Collapse, IconButton, Pagination
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrdersOfCustomer = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.orders);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleExpandClick = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>List of Orders</Typography>
            {currentOrders.map(order => (
                <Accordion key={order.id} style={{ marginBottom: '16px' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${order.id}-content`}
                        id={`panel${order.id}-header`}
                    >
                        <Typography variant="h6">Order ID: {order.id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box style={{ width: '100%' }}>
                            <Typography color="textSecondary" gutterBottom>
                                Payment Status: {order.payment_status}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Type of Payment: {order.type_of_payment}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Delivery Requirement: {order.delivery_requirement}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Date: {new Date(order.updated_at).toLocaleString()}
                            </Typography>

                            <Typography variant="subtitle1" component="h3" gutterBottom>
                                Order Details:
                                <IconButton
                                    onClick={() => handleExpandClick(order.id)}
                                    aria-expanded={expandedOrderId === order.id}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </Typography>

                            <Collapse in={expandedOrderId === order.id} timeout="auto" unmountOnExit>
                                <TableContainer component={Paper}>
                                    <Table aria-label="order details table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Product</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {order.order_details.map((detail, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {detail.product_name}
                                                    </TableCell>
                                                    <TableCell align="right">{detail.quantity}</TableCell>
                                                    <TableCell align="right">${detail.price}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Collapse>

                            <Typography variant="h6" component="p" style={{ marginTop: '16px' }}>
                                Total Amount: ${order.total_amount}
                            </Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Box display="flex" justifyContent="center" style={{ marginTop: '1vh' }}>
                <Pagination
                    count={Math.ceil(orders.length / ordersPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    );
};

export default OrdersOfCustomer;
