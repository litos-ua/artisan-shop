
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { post } from '../../api';
import { configObj } from '../../resources'

export function EmailVerificationPage() {
    const { email } = useParams();
    const [verificationStatus, setVerificationStatus] = useState('error');

    const handleResendVerificationEmail = async () => {
        try {
            // Get token from LocalStorage
            //const token = localStorage.getItem('token');
            const token = configObj.getToken();

            if (!token) {
                // Handle case where user not authenticated
                console.error('Token not found. User not authenticated.');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const payload = {
                email: email
            };

            const response = await post('/email/verification-notification', payload, headers);
            console.log('Resend successful:', response);
            setVerificationStatus('pending');
        } catch (error) {
            console.error('Resend failed:', error);
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
