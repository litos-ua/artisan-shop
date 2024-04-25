
import React, { useState } from "react";
import * as Yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Header, Footer } from "../../components";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../router";
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../../ducks";
import { post } from "../../api";

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(value.includes("@") ? "" : "Invalid email address");
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(value.length >= 8 ? "" : "Password must be at least 8 characters");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate({ email, password }, { abortEarly: false });

            const response = await post('/login', { email, password });
            const {user, status, token} = response;
            console.log('USER', user);
            console.log('response', response);

            if (status === 201 && token) {
                // Login successful
                dispatch(loginSuccess());
                navigate(ROUTE.HOME);
                setEmailConfirmed(true);
                localStorage.setItem('token', token);
            } else if (status === 207 && token) {
                // Partial authentication due to unverified email
//                console.log('user.email:', user.email);
                console.log('Token:', token);
                navigate(`${ROUTE.EMAIL_VERIFICATION.replace(":email", user.email)}`);
                setLoginError("Email not verified. You are partially authenticated. Please verify your email address.");
                localStorage.setItem('token', token);
            }
        } catch (error) {
            console.error("Login failed:", error);
            const { status } = error;
            console.log('STATUS', status);

            if (error) {
                // Handle error response from server

                if (status === 404) {
                    // User not found error
                    setLoginError("User not found. Please check your email.");
                    console.log('setLoginError', setLoginError);
                } else if (status === 403 || status === 401) {
                    // Email not verified or invalid email/password error
                    if (status === 403) {
                        setLoginError("Email not verified. You are partially authenticated. Please verify your email address.");
                    } else {
                        setLoginError("Invalid email or password. Please try again.");
                    }
                    // setEmailConfirmed(false); // If needed, uncomment this line
                } else {
                    // Other errors
                    setLoginError("An error occurred. Please try again later.");
                }
            } else {
                // Handle other errors
                setLoginError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <Box>
            <Header />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', maxWidth: '80vw' }}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                                Login
                            </Typography>
                            <Box sx={{ width: "100%", marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Email Address"
                                    value={email}
                                    onChange={handleEmailChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!emailError}
                                    helperText={emailError}
                                    InputProps={{
                                        startAdornment: <FaEnvelope />
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: "100%", marginBottom: "10px" }}>
                                <TextField
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!passwordError}
                                    helperText={passwordError}
                                    InputProps={{
                                        startAdornment: <FaLock />
                                    }}
                                />
                            </Box>
                            {loginError && <Typography color="error">{loginError}</Typography>}
                            <Box sx={{ width: "100%", height: "6vh", marginTop: "10px" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "100%", height: "100%", fontSize: '1rem' }}>
                                    Login
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}








