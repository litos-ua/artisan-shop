
import React, { useState, useEffect } from 'react';
import { ROUTE } from "../../router";
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { getCustomer, updateCustomer, put, post, postCustomer } from '../../api';
import { Header } from "../../components";
import CustomerDataForm from './CustomerDataForm';
import PasswordChangeForm from './PasswordChangeForm';
import OrdersOfCustomer from "./OrdersOfCustomer";
import OrderEmptyPage from "./OrderEmptyPage";
import ChatInterface from './ChatInterface';
import { useSelector } from "react-redux";
import { selectUserId, selectUserEmail } from "../../ducks";
import { configObj } from "../../resources";
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './../../components/Errors';


export const CustomerAccountPage = () => {
    const [customer, setCustomer] = useState(null);
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const userEmail = useSelector(selectUserEmail);
    const { t } = useTranslation();

    useEffect(() => {
        const token = configObj.getToken();
        if (token) {
            console.log('EffectToken:', token);
            fetchCustomerDetails(token);
        }
    }, []);

    useEffect(() => {
        if (customer) {
            handleMenuItemClick('Settings');
        }
    }, [customer]);

    const fetchCustomerDetails = async (token) => {
        try {
            const customerData = await getCustomer('/customer/token', { Authorization: `Bearer ${token}` });
            setCustomer(customerData);
        } catch (error) {
            console.error("Error fetching customer details:", error);
            setCustomer({
                first_name: '',
                last_name: '',
                email: userEmail,
                phone_number: '',
                zip_code: '',
                address: ''
            });
        }
    };

    const handleMenuItemClick = (menuItem) => {
        const { id } = userId;
        const idAdmin = configObj.adminUserId;
        setActiveMenuItem(menuItem);
        switch (menuItem) {
            case 'Home':
                navigate(ROUTE.HOME);
                break;
            case 'Orders':
                setContent(<ErrorBoundary><OrdersOfCustomer /></ErrorBoundary>);
                break;
            case 'Payments':
                setContent(<ErrorBoundary><OrderEmptyPage /></ErrorBoundary>);
                alert(menuItem);
                break;
            case 'Messages':
                setContent(<ErrorBoundary><ChatInterface userId={id} adminId={idAdmin} /></ErrorBoundary>);
                break;
            case 'Settings':
                setContent(
                    <ErrorBoundary>
                        <CustomerDataForm initialValues={customer} onSubmit={handleSubmit} />
                    </ErrorBoundary>
                );
                break;
            case 'Passwords':
                setContent(
                    <ErrorBoundary>
                        <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
                    </ErrorBoundary>
                );
                break;
            case 'Logout':
                setContent(<ErrorBoundary><OrderEmptyPage /></ErrorBoundary>);
                alert(menuItem);
                break;
            default:
                break;
        }
    };

    // const handleSubmit = async (values) => {
    //     try {
    //         const token = configObj.getToken();
    //         const updatedCustomer = await updateCustomer('/customers/' + customer.id, values, {
    //             Authorization: `Bearer ${token}`
    //         });
    //         setCustomer(updatedCustomer);
    //         console.log("Customer data updated successfully:", updatedCustomer);
    //         alert("Customer data updated successfully:");
    //     } catch (error) {
    //         console.error("Error updating customer data:", error);
    //         alert("Error updating customer data:");
    //     }
    // };

    const handleSubmit = async (values) => {
        try {
            const token = configObj.getToken();
            if (customer.id) {
                const updatedCustomer = await updateCustomer(`/customers/${customer.id}`, values, {
                    Authorization: `Bearer ${token}`
                });
                setCustomer(updatedCustomer);
                console.log("Customer data updated successfully:", updatedCustomer);
                alert("Customer data updated successfully:");
            } else {
                const newCustomer = await post(`/customers`, {  //postCustomer
                    ...values, user_id: userId, email: userEmail
                }, {
                    Authorization: `Bearer ${token}`
                });
                setCustomer(newCustomer);
                console.log("Customer created successfully:", newCustomer);
                alert("Customer created successfully:");
            }
        } catch (error) {
            console.error("Error submitting customer data:", error);
            alert("Error submitting customer data:");
        }
    };

    const handlePasswordChangeSubmit = async (values) => {
        try {
            const token = configObj.getToken();
            await put('/user/password/change', values, {
                Authorization: `Bearer ${token}`
            });
            console.log("Password changed successfully:");
            alert("Password changed successfully:");
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Error changing password:");
        }
    };

    console.log('customer', customer);

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Header />
            <Box sx={{ display: 'flex', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
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
                            <ListItemText primary={t('home')} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Orders' ? '#5fa6ec' : 'transparent'
                                  }}
                                  onClick={() => handleMenuItemClick('Orders')}
                        >
                            <ListItemText primary={t('orders')} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Payments' ? '#5fa6ec' : 'transparent'
                                  }}
                                  onClick={() => handleMenuItemClick('Payments')}
                        >
                            <ListItemText primary={t('payments')} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Messages' ? '#5fa6ec' : 'transparent'
                                  }}
                                  onClick={() => handleMenuItemClick('Messages')}
                        >
                            <ListItemText primary={t('messages')} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Settings' ? '#5fa6ec' : 'transparent'
                                  }}
                                  onClick={() => handleMenuItemClick('Settings')}
                        >
                            <ListItemText primary={t('settings')} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Passwords' ? '#5fa6ec' : 'transparent'
                                  }}
                                  onClick={() => handleMenuItemClick('Passwords')}
                        >
                            <ListItemText primary={t('changePas')} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                        <ListItem button
                                  sx={{
                                      borderRadius: '0.5rem',
                                      '&:hover': { backgroundColor: '#5fa6ec' },
                                      backgroundColor: activeMenuItem === 'Logout' ? '#5fa6ec' : 'transparent'
                                  }}
                                  onClick={() => handleMenuItemClick('Logout')}
                        >
                            <ListItemText primary={t('logout')} sx={{ '.MuiTypography-root': { fontSize: '1.2rem' } }} />
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{ marginLeft: '3.5vw', marginRight: '3vw', flexGrow: 1 }}>
                    <Card sx={{ marginBottom: '0.5vw', backgroundColor: '#ffffb3', borderRadius: '1rem', border: '2px solid #bfbfbf', }}>
                        <CardHeader
                            title={`${t('customer')}: ${customer.first_name} ${customer.last_name} ${t('profile')} `}
                            sx={{ marginBottom: 0, paddingBottom: 0 }}
                        />
                        <CardContent>
                            <Typography>Email: {customer.email}</Typography>
                            <Typography>{t('phoneNumber')}: {customer.phone_number}</Typography>
                        </CardContent>
                    </Card>

                    <Box sx={{ padding: '0.5vw' }}>
                        {content}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
