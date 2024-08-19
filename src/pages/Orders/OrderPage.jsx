
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Header } from "../../components";
import { ROUTE } from "../../router";
import { clearReduxStore } from "../../ducks";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Radio, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, RadioGroup, Box, Button, Typography } from '@mui/material';
import OrderTable from './OrderTable';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { get, post } from "../../api";
import { configObj } from "../../resources";
import { useTranslation } from 'react-i18next';

export const OrderForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [totalSum, setTotalSum] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');

    const [phone, setPhone] = useState('+38');
    const [phoneError, setPhoneError] = useState('');

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate(ROUTE.HOME);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    useEffect(() => {
        const sum = cartItems.reduce((acc, item) => acc + item.quantityCount * parseInt(item.price), 0);
        setTotalSum(sum);
    }, [cartItems]);

    useEffect(() => {
        const token = configObj.getToken();
        if (isAuthenticated && token) {
            fetchCustomer(token);
        }
    }, [isAuthenticated]);


    const fetchCustomer = async (token) => {
        setLoading(true);
        try {
            const response = await get('/customer/token', { Authorization: `Bearer ${token}` });

            // Check if customer data exists
            if (response && response.email) {
                setUserEmail(response.email);
                setName(response.first_name);
                setSurname(response.last_name);
                setPhone(response.phone_number);
            } else {
                // If customer data does not exist, fetch user email
                await fetchUserEmail(token);
            }
        } catch (error) {
            console.error("Error fetching customer data:", error);
            //setError('Error fetching customer data'); // - This line blocks execution fetchUserEmail
            await fetchUserEmail(token); // Attempt to fetch user email if customer data is not found
        } finally {
            setLoading(false);
        }
    };

    const fetchUserEmail = async (token) => {
        setLoading(true);
        try {
            const response = await post('/user', {}, { Authorization: `Bearer ${token}` });
            setUserEmail(response.email);
        } catch (error) {
            console.error("Error fetching user email:", error);
            setError('Error fetching user email');
        } finally {
            setLoading(false);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(
            value.length < 3
                ? t('formErrorMessage_firstNameMin')
                : value.length > 20
                    ? t('formErrorMessage_nameMaxLength')
                    : !/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(value)
                        ? t('formErrorMessage_invalidNameFormat')
                        : ""
        );
    };

    const handleSurnameChange = (e) => {
        const value = e.target.value;
        setSurname(value);
        setSurnameError(
            value.length > 20
                ? t('formErrorMessage_lastNameMax')
                : !/^[a-zA-Z]*$/.test(value)
                    ? t('formErrorMessage_invalidSurnameFormat')
                    : ""
        );
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        setPhoneError(
            /^\+38\d{10}$/.test(value)
                ? ""
                : t('formErrorMessage_phoneNumberFormat')
        );
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string()
            .email(t('formErrorMessage_emailFormat'))
            .required(t('formErrorMessage_emailRequired')),
        notes: Yup.string()
            .max(100, t('formErrorMessage_notesMax')),
        advancePayment: Yup.boolean(),
        delivery: Yup.boolean(),
    });

    const handleSubmit = async (values) => {
        if (!isAuthenticated) {
            alert(t('alertErrorMessage_needLog'));
            navigate(ROUTE.LOGIN);
            return;
        }

        try {
            const token = configObj.getToken();
            const response = await post('/order', {
                ...values,
                name,
                surname,
                phone,
                cartItems: cartItems.map(item => ({
                    productKey: item.productKey,
                    quantityCount: item.quantityCount,
                    price: item.price
                }))
            }, { Authorization: `Bearer ${token}` });

            if (response && response.order_id) {
                if (totalSum === response.total_amount) {
                    setOrderDetails(response);
                    handleOpenModal();
                    dispatch(clearReduxStore());
                } else {
                    setError(t('alertErrorMessage_invalidAmount'));
                    alert(t('alertErrorMessage_invalidAmount'));
                    navigate(ROUTE.CART);
                }
            }
        } catch (error) {
            console.error(t("alertErrorMessage_errorPlacingOrder"), error);
            setError(t("alertErrorMessage_errorPlacingOrder"));
            alert(t("alertErrorMessage_errorPlacingOrder"));
            navigate(ROUTE.CART);
        }
    };

    return (
        <Box className="order">
            <Header />
            <OrderTable cartItems={cartItems} />

            <Typography variant="h5" className="order__total_amount" sx={{ marginBottom: '20px' }}>
                {t('totalAmount')}: {totalSum}
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Formik
                    initialValues={{
                        email: userEmail,
                        notes: '',
                        advancePayment: false,
                        delivery: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit} className="order__form_input">
                            <Box className="input-group">
                                <TextField
                                    label={t('firstName')}
                                    fullWidth
                                    // value={formik.values.name || ''}
                                    value={name || ''}
                                    onChange={(e) => handleNameChange(e, formik)}
                                    name="name"
                                    error={!!nameError}
                                    helperText={nameError}
                                />
                                <TextField
                                    label={t('lastName') + " (optional)"}
                                    fullWidth
                                    value={surname || ''}
                                    onChange={handleSurnameChange}
                                    name="surname"
                                    error={!!surnameError}
                                    helperText={surnameError}
                                />
                            </Box>
                            <Box className="input-group">
                                <TextField
                                    type="email"
                                    label="Email"
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    name="email"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    label={t('phoneNumber')}
                                    fullWidth
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    name="phone"
                                    error={!!phoneError}
                                    helperText={phoneError}
                                />
                            </Box>
                            <Box>
                                <FormControl className="order__form_input-group">
                                    <FormLabel className="order__form_radio-label" sx={{ fontSize: '1.0vw', marginBottom: '0', marginTop: '0', paddingBottom: '0', paddingTop: '0' }}>
                                        {t('paymentForm')}
                                    </FormLabel>
                                    <RadioGroup className="order__form_label" row name="paymentType" value={formik.values.paymentType} onChange={formik.handleChange}>
                                        <FormControlLabel
                                            value="Cash"
                                            control={<Radio />}
                                            label={t('cash')}
                                            sx={{ marginBottom: '0', marginTop: '0', paddingBottom: '0', paddingTop: '0' }}
                                        />
                                        <FormControlLabel
                                            value="Card"
                                            control={<Radio />}
                                            label={t('card')}
                                            sx={{ marginBottom: '1', marginTop: '0', paddingBottom: '1', paddingTop: '0' }}
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl className="order__form_input">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox name="advancePayment" checked={formik.values.advancePayment} onChange={formik.handleChange} />}
                                            label={t('advancePayment')}
                                            sx={{ marginTop: '14%', paddingTop: '10%', paddingLeft: '2vw' }}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="delivery" checked={formik.values.delivery} onChange={formik.handleChange} />}
                                            label={t('delivery')}
                                            sx={{ paddingLeft: '2vw' }}
                                        />
                                    </FormGroup>
                                </FormControl>

                                <FormControl className="order__form_input textarea" sx={{ width: '90%', marginLeft: '2vw' }}>
                                    <TextField
                                        placeholder={t('notes')}
                                        multiline
                                        minRows={'3'}
                                        size={"small"}
                                        value={formik.values.notes}
                                        onChange={formik.handleChange}
                                        name="notes"
                                        sx={{ marginBottom: 0, paddingBottom: 0 }}
                                        error={formik.touched.notes && Boolean(formik.errors.notes)}
                                        helperText={formik.touched.notes && formik.errors.notes}
                                    />
                                </FormControl>
                            </Box>
                            <Box className="order__form_submit_container">
                                <Button
                                    variant="contained"
                                    className="order__form_submit"
                                    type="submit"
                                    sx={{ fontSize: '0.7vw', marginLeft: '70%', }}
                                >
                                    {t('orderButton')}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}

            <Footer />
            {/* Modal form to display order details */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{t('orderDetails')}</DialogTitle>
                <DialogContent>
                    <Typography>{t('systemMessOrderAccepted')}</Typography>
                    <Typography>{t('orderID')}: {orderDetails?.order_id}</Typography>
                    <Typography>{t('messageCreated')}: {orderDetails?.created_at}</Typography>
                    <Typography>{t('totalAmount')}: {orderDetails?.total_amount}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>{t('close')}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderForm;
