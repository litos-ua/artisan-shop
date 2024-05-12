import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { getCustomer, updateCustomer, put } from '../../api';
import {Header} from "../../components";
import CustomerDataForm from './CustomerDataForm';
import PasswordChangeForm from './PasswordChangeForm'


export const CustomerAccountPage = () => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchCustomerDetails(token);
            console.log('customer:', customer);
        }
    }, []);

    const fetchCustomerDetails = async (token) => {
        try {
            const customerData = await getCustomer('/customer/token',{ Authorization: `Bearer ${token}` });
            setCustomer(customerData);
        } catch (error) {
            console.error("Error fetching customer details:", error);
            // Handle error
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
            const newPassword = await put('/user/password/change', values, {
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
                        <ListItem button sx={{ borderRadius: '0.5rem', '&:hover': { backgroundColor: '#5fa6ec' } }}>
                            <ListItemText primary="Home" sx={{ '.MuiTypography-root': { fontSize: '1.2rem'} }} />
                        </ListItem>
                        <ListItem button sx={{ borderRadius: '0.5rem', '&:hover': { backgroundColor: '#5fa6ec' } }}>
                            <ListItemText primary="Orders" sx={{ '.MuiTypography-root': { fontSize: '1.2rem'} }} />
                        </ListItem>
                        <ListItem button sx={{ borderRadius: '0.5rem', '&:hover': { backgroundColor: '#5fa6ec' } }}>
                            <ListItemText primary="Payments" sx={{  '.MuiTypography-root': { fontSize: '1.2rem'} }} />
                        </ListItem>
                        <ListItem button sx={{ borderRadius: '0.5rem', '&:hover': { backgroundColor: '#5fa6ec' } }}>
                            <ListItemText primary="Messages" sx={{  '.MuiTypography-root': { fontSize: '1.2rem'} }} />
                        </ListItem>
                        <ListItem button sx={{ borderRadius: '0.5rem', '&:hover': { backgroundColor: '#5fa6ec' } }}>
                            <ListItemText primary="Settings" sx={{ '.MuiTypography-root': { fontSize: '1.2rem'} }} />
                        </ListItem>
                        <ListItem button sx={{ borderRadius: '0.5rem', '&:hover': { backgroundColor: '#5fa6ec' } }}>
                            <ListItemText primary="Logout" sx={{ '.MuiTypography-root': { fontSize: '1.2rem'} }} />
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
                            {/* Other user details */}
                        </CardContent>
                    </Card>

                    {/* Customer Data Form Section */}
                    <Box sx={{ padding: '0.5vw' }}>
                        <CustomerDataForm initialValues={customer} onSubmit={handleSubmit} />
                    </Box>

                    {/* Password Change Form Section */}
                    <Box sx={{ padding: '0.5vw' }}>
                        <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
                    </Box>

                    {/* Message Exchange Form Section */}
                    <Box sx={{ padding: '0.5vw' }}>
                        {/* Your message exchange form */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};



