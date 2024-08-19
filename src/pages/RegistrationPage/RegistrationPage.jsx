
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Header, Footer } from "../../components";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../router";
import * as Yup from 'yup';
import { post } from "../../api";
import { useTranslation } from 'react-i18next';

export function RegistrationPage() {
    const { t } = useTranslation();
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
            .min(3, t('formErrorMessage_nameMinLength'))
            .max(20, t('formErrorMessage_nameMaxLength'))
            .matches(/^[a-zA-Z0-9_.-]+$/, t('formErrorMessage_invalidNameFormat'))
            .required(t('formErrorMessage_nameRequired')),
        email: Yup.string()
            .email(t('formErrorMessage_invalidEmail'))
            .required(t('formErrorMessage_emailRequired')),
        password: Yup.string()
            .min(8, t('formErrorMessage_passwordMinLength'))
            .matches(
                /^[a-zA-Z0-9^_)(}{\]\[#$&*@!]*$/,
                t('formErrorMessage_passwordInvalidCharacters')
            )
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9^_)(}{\]\[#$&*@!]{8,}$/,
                t('formErrorMessage_passwordComplexity')
            )
            .required(t('formErrorMessage_passwordRequired')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('formErrorMessage_passwordsMustMatch'))
            .required(t('formErrorMessage_confirmPasswordRequired')),
        agreeToProcessing: Yup.boolean()
            .oneOf([true], t('formErrorMessage_agreeToProcessingRequired'))
            .required(t('formErrorMessage_agreeToProcessingRequired'))
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(
            value.length >= 3 && value.length <= 20 && /^[a-zA-Z0-9_.-]+$/.test(value)
                ? ""
                : t('formErrorMessage_invalidNameFormat')
        );
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(value.includes("@") ? "" : t('formErrorMessage_invalidEmail'));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const allowedPattern = /^[a-zA-Z0-9^_)(}{\]\[#$&*@!]*$/;
        const requiredPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9^_)(}{\]\[#$&*@!]{8,}$/;

        if (!allowedPattern.test(value)) {
            setPasswordError(t('formErrorMessage_passwordInvalidCharacters'));
        }
        else if (value.length < 8) {
            setPasswordError(t('formErrorMessage_passwordMinLength'));
        }
        else if (!requiredPattern.test(value)) {
            setPasswordError(t('formErrorMessage_passwordComplexity'));
        }
        else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value === password ? "" : t('formErrorMessage_passwordsMustMatch'));
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
            setRegistrationMessage(t('formErrorMessage_registrationSuccess'));
            alert(registrationMessage);
            navigate(ROUTE.HOME);
            console.log("Registration successful:", response);
        } catch (error) {
            console.error("Registration failed:", error);
            alert(t('formErrorMessage_registrationFailed'));
            setRegistrationError('');
            console.log('localError1', error.message);
            console.log('localError2', error.errors.email[0]);
            if (error && error.message && error.errors.email) {
                const errorMessage = `${error.message}. ${error.errors.email[0]}`;
                setRegistrationError(errorMessage);
            } else {
                setRegistrationError(t('formErrorMessage_genericError'));
            }
        }
    };

    const handleResendVerificationEmail = async () => {
        try {
            const response = await post('/email/verification-notification', { email });
            setRegistrationMessage(t('formErrorMessage_verificationEmailResent'));
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
                                {t('register')}
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
                                    label={t('name')}
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
                                    label={t('emailAdr')}
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
                                    label={t('pas')}
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
                                    label={t('confirmPassword')}
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
                                    {t('agreePersonalData')}
                                </label>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ minWidth: "45%", fontSize: '1rem'}}>
                                    {t('signUpButtonName')}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleResendVerificationEmail}
                                    sx={{ minWidth: "45%", fontSize: '1rem'}}>
                                    {t('signUpResendEmail')}
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