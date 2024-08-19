
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const CustomerDataForm = ({ initialValues, onSubmit }) => {
    const { t } = useTranslation();
    const [nameError, setNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [zipCodeError, setZipCodeError] = useState("");
    const [addressError, setAddressError] = useState("");

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(3, t('formErrorMessage_firstNameMin'))
            .max(50, t('formErrorMessage_firstNameMax'))
            .required(t('formErrorMessage_firstNameRequired')),
        last_name: Yup.string()
            .min(3, t('formErrorMessage_lastNameMin'))
            .max(100, t('formErrorMessage_lastNameMax'))
            .required(t('formErrorMessage_lastNameRequired')),
        phone_number: Yup.string()
            .matches(/^\+38\d{10}$/, t('formErrorMessage_phoneNumberFormat'))
            .required(t('formErrorMessage_phoneNumberRequired')),
        zip_code: Yup.string()
            .max(10, t('formErrorMessage_zipCodeMax')),
        address: Yup.string()
            .max(255, t('formErrorMessage_addressMax'))
            .nullable(),
    });

    const handleFirstNameChange = (e, formik) => {
        const value = e.target.value;
        formik.setFieldValue('first_name', value);
        setNameError(
            value.length < 3
                ? t('formErrorMessage_firstNameMin')
                : value.length > 50
                    ? t('formErrorMessage_firstNameMax')
                    : ""
        );
    };

    const handleLastNameChange = (e, formik) => {
        const value = e.target.value;
        formik.setFieldValue('last_name', value);
        setLastNameError(
            value.length < 3
                ? t('formErrorMessage_lastNameMin')
                : value.length > 100
                    ? t('formErrorMessage_lastNameMax')
                    : ""
        );
    };

    // Utility function for handling phone number changes
    const handlePhoneNumberChange = (e, formik) => {
        const value = e.target.value;
        formik.setFieldValue('phone_number', value);
        setPhoneNumberError(
            /^\+38\d{10}$/.test(value)
                ? ""
                : t('formErrorMessage_phoneNumberFormat')
        );
    };

    const handleZipCodeChange = (e, formik) => {
        const value = e.target.value;
        formik.setFieldValue('zip_code', value);
        setZipCodeError(
            value.length <= 10
                ? ""
                : t('formErrorMessage_zipCodeMax')
        );
    };

    const handleAddressChange = (e, formik) => {
        const value = e.target.value;
        formik.setFieldValue('address', value);
        setAddressError(
            value.length <= 255
                ? ""
                : t('formErrorMessage_addressMax')
        );
    };

    // Return null if initial values are not provided
    if (!initialValues) {
        return null;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <FormControl
                    component="form"
                    onSubmit={formik.handleSubmit}
                    className="customer-data-form"
                    sx={{
                        backgroundColor: '#ffffb3',
                        marginTop: '5vh',
                        borderRadius: '1rem',
                        border: '0.15rem solid #bfbfbf',
                        padding: '2vh'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t('firstName')}
                                value={formik.values.first_name || ''}
                                onChange={(e) => handleFirstNameChange(e, formik)}
                                name="first_name"
                                error={!!nameError}
                                helperText={nameError}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t('lastName')}
                                value={formik.values.last_name || ''}
                                onChange={(e) => handleLastNameChange(e, formik)}
                                name="last_name"
                                error={!!lastNameError}
                                helperText={lastNameError}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t('phoneNumber')}
                                value={formik.values.phone_number || ''}
                                onChange={(e) => handlePhoneNumberChange(e, formik)}
                                name="phone_number"
                                error={!!phoneNumberError}
                                helperText={phoneNumberError}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t('zip')}
                                value={formik.values.zip_code || ''}
                                onChange={(e) => handleZipCodeChange(e, formik)}
                                name="zip_code"
                                error={!!zipCodeError}
                                helperText={zipCodeError}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={t('address')}
                                value={formik.values.address || ''}
                                onChange={(e) => handleAddressChange(e, formik)}
                                name="address"
                                error={!!addressError}
                                helperText={addressError}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    className="submit"
                                    type="submit"
                                    sx={{ width: '20%', height: '5vh' }}
                                >
                                    {t('submit')}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </FormControl>
            )}
        </Formik>
    );
};

export default CustomerDataForm;



