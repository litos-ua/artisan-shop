// import React from 'react';
//
// export class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false, error: null, errorInfo: null };
//     }
//
//     static getDerivedStateFromError(error) {
//         // Update state so the next render will show the fallback UI.
//         return { hasError: true, error };
//     }
//
//     componentDidCatch(error, errorInfo) {
//         // You can also log the error to an error reporting service
//         console.log("Error:", error, "Error Info:", errorInfo);
//         this.setState({ error, errorInfo });
//     }
//
//     render() {
//         if (this.state.hasError) {
//             // You can render any custom fallback UI
//             return (
//                 <div>
//                     <h1>Something went wrong.</h1>
//                     <details style={{ whiteSpace: 'pre-wrap' }}>
//                         {this.state.error && this.state.error.toString()}
//                         <br />
//                         {this.state.errorInfo.componentStack}
//                     </details>
//                 </div>
//             );
//         }
//
//         return this.props.children;
//     }
// }
//
// export default ErrorBoundary;

import React, { Component } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log("Error:", error, "Error Info:", errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorComponent error={this.state.error} errorInfo={this.state.errorInfo} />
            );
        }

        return this.props.children;
    }
}

    const ErrorComponent = ({ error, errorInfo }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ textAlign: 'center', padding: '2rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Something went wrong.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                {error && error.toString()}
            </Typography>
            <Typography variant="body2" component="div" style={{ whiteSpace: 'pre-wrap' }}>
                {errorInfo.componentStack}
            </Typography>
            <Box sx={{ marginTop: '1rem' }}>
                <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ marginRight: '1rem' }}>
                    Go to Home
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
        </Box>
    );
};

export default ErrorBoundary;


