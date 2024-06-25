

import React, { useState, useEffect } from 'react';
import { ROUTE } from "../../router";
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { getCustomer, updateCustomer, put } from '../../api';
import {Header} from "../../components";
import CustomerDataForm from './CustomerDataForm';
import PasswordChangeForm from './PasswordChangeForm'
import OrdersOfCustomer from "./OrdersOfCustomer";
import OrderEmptyPage from "./OrderEmptyPage";
import ChatInterface from './ChatInterface';
import {useSelector} from "react-redux";
import {selectUserId} from "../../ducks";
import { configObj } from "../../resources";


export const CustomerAccountPage = () => {
    const [customer, setCustomer] = useState(null);
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchCustomerDetails(token);
        }
    }, []);

    useEffect(() => {
        // Set default content when component mounts
        handleMenuItemClick('Settings');
    }, []);


    const fetchCustomerDetails = async (token) => {
        try {
            const customerData = await getCustomer('/customer/token',{ Authorization: `Bearer ${token}` });
            setCustomer(customerData);
        } catch (error) {
            console.error("Error fetching customer details:", error);
        }
    };


    const handleMenuItemClick = (menuItem) => {
        const {id} = userId;
        const idAdmin = configObj.adminUserId;
        console.log('CA_userID:', id, 'CA_AdminID:', idAdmin);
        setActiveMenuItem(menuItem);
        switch (menuItem) {
            case 'Home':
                navigate(ROUTE.HOME);
                break;
            case 'Orders':
                setContent(<OrdersOfCustomer />);
                break;
            case 'Payments':
                setContent(<OrderEmptyPage />);
                alert(menuItem);
                break;
            case 'Messages':
                setContent(<ChatInterface userId={id} adminId={idAdmin}/>);
                break;
            case 'Settings':
                setContent(
                    <>
                        <CustomerDataForm initialValues={customer} onSubmit={handleSubmit} />
                    </>
                );
                break;
            case 'Passwords':
                setContent(
                    <>
                        <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
                    </>
                );
                break;
            case 'Logout':
                setContent(
                    <>
                        <OrderEmptyPage />
                    </>
                );
                alert(menuItem);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const updatedCustomer = await updateCustomer('/customers/' + customer.id, values, {
                Authorization: `Bearer ${token}`
            });
            setCustomer(updatedCustomer);
            console.log("Customer data updated successfully:", updatedCustomer);
            alert("Customer data updated successfully:");
        } catch (error) {
            console.error("Error updating customer data:", error);
            alert("Error updating customer data:");
            // Handle error
        }
    };


    const handlePasswordChangeSubmit = async (values) => {
        try {
            const token = localStorage.getItem('token');
            await put('/user/password/change', values, { //const newPassword =
                Authorization: `Bearer ${token}`
            });
            console.log("Password changed successfully:");
            alert("Password changed successfully:");
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Error changing password:");
        }
    };

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Header />
            <Box sx={{ display: 'flex', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                {/* Vertical Menu Section */}
                <Box sx={{ backgroundColor: '#1b80e4', padding: '0.5vw', width: '14vw' }}>
                    <List>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Home' ? '#5fa6ec' : 'transparent'
                                  }}
                                  onClick={() => handleMenuItemClick('Home')}
                        >
                            <ListItemText primary="Home" sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Orders' ? '#5fa6ec' : 'transparent' // Apply active style
                                  }}
                                  onClick={() => handleMenuItemClick('Orders')} // Set active item on click
                        >
                            <ListItemText primary="Orders" sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Payments' ? '#5fa6ec' : 'transparent' // Apply active style
                                  }}
                                  onClick={() => handleMenuItemClick('Payments')} // Set active item on click
                        >
                            <ListItemText primary="Payments" sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Messages' ? '#5fa6ec' : 'transparent' // Apply active style
                                  }}
                                  onClick={() => handleMenuItemClick('Messages')} // Set active item on click
                        >
                            <ListItemText primary="Messages" sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Settings' ? '#5fa6ec' : 'transparent' // Apply active style
                                  }}
                                  onClick={() => handleMenuItemClick('Settings')} // Set active item on click
                        >
                            <ListItemText primary="Settings" sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Passwords' ? '#5fa6ec' : 'transparent' // Apply active style
                                  }}
                                  onClick={() => handleMenuItemClick('Passwords')} // Set active item on click
                        >
                            <ListItemText primary="Passwords" sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Logout' ? '#5fa6ec' : 'transparent' // Apply active style
                                  }}
                                  onClick={() => handleMenuItemClick('Logout')} // Set active item on click
                        >
                            <ListItemText primary="Logout" sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                    </List>

                </Box>

                {/* Content Section */}
                <Box sx={{ marginLeft: '3.5vw', marginRight: '3vw', flexGrow: 1 }}>
                    {/* User Details Section */}
                    <Card sx={{ marginBottom: '0.5vw',
                        backgroundColor: '#ffffb3',
                        borderRadius: '1rem',
                        border: '2px solid #bfbfbf',}}
                    >
                        <CardHeader
                            title={`Customer: ${customer.first_name} ${customer.last_name} Profile `}
                            sx={{ marginBottom: 0, paddingBottom: 0 }}
                        />
                        <CardContent>
                            <Typography>Email: {customer.email}</Typography>
                            <Typography>Telephone: {customer.phone_number}</Typography>
                        </CardContent>
                    </Card>

                    <Box sx={{ padding: '0.5vw' }}>
                        {content}
                    </Box>

                    {/* Message Exchange Form Section */}
                    <Box sx={{ padding: '0.5vw' }}>
                        {/* Message exchange form */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
