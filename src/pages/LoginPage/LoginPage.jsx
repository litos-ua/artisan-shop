
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
import { configObj } from '../../resources';
import { useTranslation } from 'react-i18next';

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('formErrorMessage_invalidEmail'))
            .required(t('formErrorMessage_emailRequired')),
        password: Yup.string()
            .min(8, t('formErrorMessage_passwordMinLength'))
            .required(t('formErrorMessage_passwordRequired')),
    });

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(value.includes("@") ? "" : t('formErrorMessage_invalidEmail'));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(value.length >= 8 ? "" : t('formErrorMessage_passwordMinLength'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate({ email, password }, { abortEarly: false });

            const response = await post('/login', { email, password });
            const { user, status, token } = response;

            if (status === 201 && token) {
                dispatch(loginSuccess({ id: user.id, email: user.email, role: user.role }));
                navigate(ROUTE.HOME);
                setEmailConfirmed(true);
                configObj.setToken(token);
            } else if (status === 207 && token) {
                navigate(`${ROUTE.EMAIL_VERIFICATION.replace(":email", user.email)}`);
                setLoginError(t('formErrorMessage_emailNotVerified'));
                configObj.setToken(token);
            }
        } catch (error) {
            const { status } = error;

            if (status === 404) {
                setLoginError(t("formErrorMessage_userNotFound"));
            } else if (status === 403) {
                setLoginError(t("formErrorMessage_emailNotVerified"));
            } else if (status === 401) {
                setLoginError(t("formErrorMessage_invalidEmailOrPassword"));
            } else {
                setLoginError(t("formErrorMessage_genericError"));
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
                                {t('login')}
                            </Typography>
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
                            {loginError && <Typography color="error">{loginError}</Typography>}
                            <Box sx={{ width: "100%", height: "6vh", marginTop: "10px" }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "100%", height: "100%", fontSize: '1rem' }}>
                                    {t('loginBut')}
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







