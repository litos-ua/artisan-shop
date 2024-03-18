import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Header } from "../../components";
import "./orders.css";
import { ROUTE } from "../../router";
import { clearReduxStore } from "../../ducks";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Radio, FormControl, FormControlLabel, FormLabel, RadioGroup, Box, Button, Typography } from '@mui/material';
import OrderTable from './OrderTable';
import { Formik } from 'formik';
import * as Yup from 'yup';

export const OrderForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [totalSum, setTotalSum] = useState(0);

    useEffect(() => {
        const sum = cartItems.reduce((acc, item) => acc + item.quantityCount * parseInt(item.price), 0);
        setTotalSum(sum);
    }, [cartItems]);

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
            .max(100, 'Примітки мають містити не більше 100 символів')
    });

    const handleSubmit = (values) => {
        if (!isAuthenticated) {
            alert('You need to log in to place an order.');
            navigate(ROUTE.LOGIN);
            return;
        }

        console.log(values);
        alert(`Ваше замовлення на сумму ${totalSum} прийнято в обробку`);

        dispatch(clearReduxStore());
        navigate(ROUTE.HOME);
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

            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    phone: '+38',
                    paymentType: 'Cash',
                    notes: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                                <FormLabel className="order__form_radio-label" sx={{ fontSize: '1.2vw' }}>
                                    Форма оплати
                                </FormLabel>
                                <RadioGroup className="order__form_label" row={true} name="paymentType" value={formik.values.paymentType} onChange={formik.handleChange}>
                                    <FormControlLabel
                                        value="Cash"
                                        control={<Radio />}
                                        label="Готівка"
                                    />
                                    <FormControlLabel
                                        value="Credit card"
                                        control={<Radio />}
                                        label="Картка"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl className="order__form_input textarea" sx={{ width: '32vw', marginLeft: '6vw' }}>
                                <TextField
                                    placeholder="Примітки"
                                    multiline={true}
                                    minRows={'3'}
                                    size={"small"}
                                    value={formik.values.notes}
                                    onChange={formik.handleChange}
                                    name="notes"
                                    error={formik.touched.notes && Boolean(formik.errors.notes)}
                                    helperText={formik.touched.notes && formik.errors.notes}
                                />
                            </FormControl>
                        </Box>
                        <Box className="order__form_submit_container">
                            <Button variant="contained" className="order__form_submit" type="submit" sx={{ fontSize: '1vw' }}>Замовити</Button>
                        </Box>
                    </form>
                )}
            </Formik>

            <Footer />
        </Box>
    );
};

export default OrderForm;


