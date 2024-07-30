
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Header, Footer } from "../../components";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../router";
import * as Yup from 'yup';
import { post } from "../../api";

export function RegistrationPage() {
    const buttonName = "Register";
    const resendButtonName = "Resend Verification Email";
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [agreeToProcessing, setAgreeToProcessing] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState("");
    const [registrationError, setRegistrationError] = useState("");

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(20, 'Name cannot be longer than 20 characters')
            .matches(/^[a-zA-Z0-9_.-]+$/, 'Invalid name format')
            .required('Name is required'),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
            )
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        agreeToProcessing: Yup.boolean()
            .oneOf([true], 'You must agree to the processing of personal data')
            .required('You must agree to the processing of personal data')
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(
            value.length >= 3 && value.length <= 20 && /^[a-zA-Z0-9_.-]+$/.test(value)
                ? ""
                : "Invalid name format"
        );
    };

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

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value === password ? "" : "Passwords must match");
    };

    const handleAgreeToProcessingChange = (e) => {
        setAgreeToProcessing(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate({ name, email, password, confirmPassword, agreeToProcessing }, { abortEarly: false });
            const response = await post('/register', { name, email, password });
            setRegistrationError("");
            setRegistrationMessage("Registration successful. Please check your email for verification.");
            navigate(ROUTE.HOME);
            console.log("Registration successful:", response);
        } catch (error) {
            console.error("Registration failed:", error);
            setRegistrationError('');
            console.log('localError1', error.message);
            console.log('localError2', error.errors.email[0]);
            if (error && error.message && error.errors.email) {
                // Construct error message from response
                const errorMessage = `${error.message}. ${error.errors.email[0]}`;
                setRegistrationError(errorMessage); // Display specific error message from server
             } else {
                 setRegistrationError("An error occurred. Please try again later."); // Display generic error message
            }
        }
    };

    const handleResendVerificationEmail = async () => {
        try {
            //const response = await post('/resend-verification-email', { email });
            const response = await post('/email/verification-notification', { email });
            setRegistrationMessage("Verification email resent. Please check your email.");
            console.log("Resend verification email successful:", response);
        } catch (error) {
            console.error("Resend verification email failed:", error);
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
                                Registration
                            </Typography>
                            {registrationMessage && (
                                <Typography variant="body1" color="success" sx={{ marginBottom: "20px" }}>
                                    {registrationMessage}
                                </Typography>
                            )}
                            {registrationError && (
                                <Typography variant="body1" color="error" sx={{ marginBottom: "20px" }}>
                                    {registrationError}
                                </Typography>
                            )}
                            <Box sx={{ width: "100%", marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Name"
                                    value={name}
                                    onChange={handleNameChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!nameError}
                                    helperText={nameError}
                                    InputProps={{
                                        startAdornment: <FaUser />
                                    }}
                                />
                            </Box>
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
                            <Box sx={{ width: "100%", marginBottom: "10px" }}>
                                <TextField
                                    type="password"
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={!!confirmPasswordError}
                                    helperText={confirmPasswordError}
                                    InputProps={{
                                        startAdornment: <FaLock />
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <input
                                    type="checkbox"
                                    id="agreeToProcessing"
                                    required
                                    checked={agreeToProcessing} // Connect checkbox to state
                                    onChange={handleAgreeToProcessingChange} // Handle checkbox change
                                />
                                <label htmlFor="agreeToProcessing" style={{ marginLeft: "8px" }}>
                                    I agree to the processing of personal data.
                                </label>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ minWidth: "45%", fontSize: '1rem'}}>
                                    {buttonName}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleResendVerificationEmail}
                                    sx={{ minWidth: "45%", fontSize: '1rem'}}>
                                    {resendButtonName}
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


