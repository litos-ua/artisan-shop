

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
import { post } from "../../api";

export const OrderForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [totalSum, setTotalSum] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

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
        const token = localStorage.getItem('token');

        if (isAuthenticated && token) {
            fetchUserEmail(token);
        }
    }, [isAuthenticated]);

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


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Ім\'я має складатися не менше ніж з 3 символів')
            .max(20, 'Ім\'я має містити не більше 20 символів')
            .matches(/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/, 'Назва може містити лише літери та тире')
            .required('Необхідно вказати ім\'я'),
        surname: Yup.string().optional(),
        email: Yup.string()
            .email('Невірна адреса електронної пошти')
            .required('Email є обов\'язковий'),
        phone: Yup.string()
            .matches(/^\+38\d{10}$/, 'Телефон після +38 має містити 10 цифр')
            .required('Телефон є обов\'язковий'),
        notes: Yup.string()
            .max(100, 'Примітки мають містити не більше 100 символів'),
        advancePayment: Yup.boolean(),
        delivery: Yup.boolean(),
    });

    const handleSubmit = async (values) => {
        if (!isAuthenticated) {
            alert('You need to log in to place an order.');
            navigate(ROUTE.LOGIN);
            return;
        }

        try {
            console.log(values);
            const token = localStorage.getItem('token');
            const response = await post('/order', {
                ...values,
                cartItems: cartItems.map(item => ({ productKey: item.productKey,quantityCount: item.quantityCount, price: item.price }))
            }, { Authorization: `Bearer ${token}` }); //'Bearer 77|TOKEN'

            if (response && response.order_id) {
                //console.log('response', response);
                //console.log('responseID', response.order_id)

                if (totalSum === response.total_amount) {
                    setOrderDetails(response);
                    handleOpenModal();
                    dispatch(clearReduxStore());
                } else {
                    setError('Arrears for the amount')
                    alert('Помилка у сумі замовлення');
                    navigate(ROUTE.CART);
                }
            }
        } catch (error) {
            console.error("Error placing order:", error);
            setError('Error placing order');
            alert('Помила при формуванні замовлення');
            navigate(ROUTE.CART);
        }
    };

    const handlePhoneChange = (e, formik) => {
        const { value } = e.target;
        formik.setFieldValue('phone', value);
    };

    return (
        <Box className="order">
            <Header />
            <OrderTable cartItems={cartItems} />

            <Typography variant="h5" className="order__total_amount" sx={{ marginBottom: '20px' }}>
                Усього разом: {totalSum}
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Formik
                    initialValues={{
                        name: '',
                        surname: '',
                        email: userEmail,
                        phone: '+38',
                        paymentType: 'Cash',
                        notes: '',
                        advancePayment: false,
                        delivery: false,
                    }}
                    validationSchema={validationSchema}
                    //onSubmit={handleSubmit}
                    onSubmit={(values) => handleSubmit(values, token)}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit} className="order__form_input">
                            <Box className="input-group">
                                <TextField
                                    label="Ім'я"
                                    fullWidth={true}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    name="name"
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    label="Прізвище (optional)"
                                    fullWidth={true}
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                    name="surname"
                                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                                    helperText={formik.touched.surname && formik.errors.surname}
                                />
                            </Box>
                            <Box className="input-group">
                                <TextField
                                    type="email"
                                    label="Email"
                                    fullWidth={true}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    name="email"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    label="Телефон"
                                    fullWidth={true}
                                    value={formik.values.phone}
                                    onChange={(e) => handlePhoneChange(e, formik)}
                                    name="phone"
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Box>
                            <Box>
                                <FormControl className="order__form_input-group">
                                    <FormLabel className="order__form_radio-label" sx={{ fontSize: '1.0vw', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0}}>
                                        Форма оплати
                                    </FormLabel>
                                    <RadioGroup className="order__form_label" row={true} name="paymentType" value={formik.values.paymentType} onChange={formik.handleChange}>
                                        <FormControlLabel
                                            value="Cash"
                                            control={<Radio />}
                                            label="Готівка"
                                            sx={{ marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}
                                        />
                                        <FormControlLabel
                                            value="Сard"
                                            control={<Radio />}
                                            label="Картка"
                                            sx={{ marginBottom: 1, marginTop: 0, paddingBottom: 1, paddingTop: 0 }}
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl className="order__form_input">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox
                                                name="advancePayment"
                                                checked={formik.values.advancePayment}
                                                onChange={formik.handleChange} />}
                                            label="AdvancePayment"
                                            sx={{ marginTop: '14%', paddingTop: '10%', paddingLeft: '2vw' }}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox
                                                name="delivery"
                                                checked={formik.values.delivery}
                                                onChange={formik.handleChange} />}
                                            label="Delivery"
                                            sx={{ paddingLeft: '2vw' }}
                                        />
                                    </FormGroup>
                                </FormControl>

                                <FormControl className="order__form_input textarea" sx={{ width: '90%', marginLeft: '2vw' }}>
                                    <TextField
                                        placeholder="Примітки"
                                        multiline={true}
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
                                    sx={{ fontSize: '1vw', marginLeftLeft: '100%' }}
                                >
                                    Замовити
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}

            <Footer />
            {/* Modal to display order details */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    <Typography>Ваше замовлення прийнято в обробку</Typography>
                    <Typography>Order ID: {orderDetails?.order_id}</Typography>
                    <Typography>Time of Creation: {orderDetails?.created_at}</Typography>
                    <Typography>Total Amount: {orderDetails?.total_amount}</Typography>
                    {/* Display other order details as needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderForm;