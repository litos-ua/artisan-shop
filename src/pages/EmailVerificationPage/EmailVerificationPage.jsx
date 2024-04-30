
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { post } from '../../api'; // Import your API request functions

export function EmailVerificationPage() {
    const { email } = useParams(); // Get the parameters from the URL
    const [verificationStatus, setVerificationStatus] = useState('error'); // State to track verification status

// Function to resend verification email
    const handleResendVerificationEmail = async () => {
        try {
            // Get token from LocalStorage
            const token = localStorage.getItem('token');

            // Check if token exists
            if (!token) {
                // Handle case where token doesn't exist (user not authenticated)
                console.error('Token not found. User not authenticated.');
                // Show error message or handle accordingly
                return;
            }

            // Set request headers with authentication token
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const payload = {
                email: email
            };

            // Send request with token included in headers
            const response = await post('/email/verification-notification', payload, headers);
            console.log('Resend successful:', response);
            setVerificationStatus('pending');
            // Show success message or handle accordingly
        } catch (error) {
            console.error('Resend failed:', error);
            // Show error message or handle accordingly
        }
    };




    return (
        <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            {verificationStatus === 'pending' && (
                <Typography variant="h4">Verifying your email {email} ...</Typography>
            )}
            {verificationStatus === 'success' && (
                <Typography variant="h4">Email verification successful!</Typography>
            )}
            {verificationStatus === 'error' && (
                <Typography variant="h4">Email verification failed {email}. Please try again later.</Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.href = '/login'}
                sx={{ marginTop: '20px' }}
            >
                Go to Login Page
            </Button>
            {verificationStatus === 'error' && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleResendVerificationEmail}
                    sx={{ marginTop: '20px' }}
                >
                    Resend Verification Email
                </Button>
            )}
        </Box>
    );
}
