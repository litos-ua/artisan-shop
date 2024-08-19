
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, FormControl, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next'

const passwordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const PasswordChangeForm = ({ onSubmit }) => {

    const { t } = useTranslation();

    return (
        <Formik
            initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
            validationSchema={passwordValidationSchema}
            // onSubmit={onSubmit}
            onSubmit={async (values, { resetForm }) => {
                try {
                    await onSubmit(values);
                    resetForm();
                } catch (error) {
                    console.error("Error submitting form:", error);
                }
            }}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <FormControl
                        sx={{
                            backgroundColor: '#ffffb3',
                            marginTop: '5vh',
                            borderRadius: '1rem',
                            border: '0.15rem solid #bfbfbf',
                            padding: '2vh',
                            width: '96%'
                        }}
                    >
                        <Box className="input-group" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextField
                                type="password"
                                label={t('currentPassword')}
                                fullWidth={true}
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                name="currentPassword"
                                error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                sx={{ padding: '1vh', marginRight: '1vw' }}
                            />
                            <TextField
                                type="password"
                                label={t('newPassword')}
                                fullWidth={true}
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                name="newPassword"
                                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                sx={{ padding: '1vh', marginRight: '1vw' }}
                            />
                            <TextField
                                type="password"
                                label={t('confirmPassword')}
                                fullWidth={true}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                name="confirmPassword"
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                sx={{ padding: '1vh' }}
                            />
                        </Box>
                        <Box className="submit-container" sx={{ display: 'flex', justifyContent: 'center', marginTop: '1vh' }}>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ width: '20%', height: '5vh' }}
                            >
                                {t('changePassword')}
                            </Button>
                        </Box>
                    </FormControl>
                </form>
            )}
        </Formik>
    );
};

export default PasswordChangeForm;




