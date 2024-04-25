// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Typography, Button } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../ducks'; // Import your Redux action if needed
// import { get } from '../../api'; // Import your API request function
//
// export function EmailVerificationPage ()  {
//     const { id, hash } = useParams(); // Get the parameters from the URL
//     const [verificationStatus, setVerificationStatus] = useState('pending'); // State to track verification status
//     const dispatch = useDispatch();
//
//     // Function to handle verification request
//     const handleVerification = async () => {
//         try {
//             const response = await get(`/email/verify/${id}/${hash}`); // Send verification request to backend using GET method
//             console.log('Verification successful:', response);
//             setVerificationStatus('success'); // Update verification status to success
//             // Dispatch any Redux actions if needed, such as logging in the user
//             dispatch(loginSuccess());
//         } catch (error) {
//             console.error('Verification failed:', error);
//             setVerificationStatus('error'); // Update verification status to error
//         }
//     };
//
//     // useEffect to handle verification on component mount
//     useEffect(() => {
//         handleVerification(); // Call handleVerification function when component mounts
//     }, []); // Empty dependency array ensures useEffect runs only once on mount
//
//
//
//     return (
//         <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
//             {verificationStatus === 'pending' && (
//                 <Typography variant="h4">Verifying your email...</Typography>
//             )}
//             {verificationStatus === 'success' && (
//                 <Typography variant="h4">Email verification successful!</Typography>
//             )}
//             {verificationStatus === 'error' && (
//                 <Typography variant="h4">Email verification failed. Please try again later.</Typography>
//             )}
//             <Button variant="contained" color="primary" onClick={() => window.location.href = '/login'}>
//                 Go to Login Page
//             </Button>
//         </Box>
//     );
// }

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { post } from '../../api'; // Import your API request functions

export function EmailVerificationPage() {
    const { email } = useParams(); // Get the parameters from the URL
    const [verificationStatus, setVerificationStatus] = useState('error'); // State to track verification status

    // // Function to resend verification email
    // const handleResendVerificationEmail = async () => {
    //     try {
    //         const payload = {
    //             "email": email
    //         };
    //         const response = await post('/email/verification-notification', payload);
    //         console.log('Resend successful:', response);
    //         setVerificationStatus('pending');
    //         // Show success message or handle accordingly
    //     } catch (error) {
    //         console.error('Resend failed:', error);
    //         // Show error message or handle accordingly
    //     }
    // };

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
