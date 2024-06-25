
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(3, 'First name must be at least 3 characters')
        .max(60, 'First name must be at most 60 characters')
        .required('First name is required'),
    last_name: Yup.string()
        .min(3, 'Last name must be at least 3 characters')
        .max(100, 'Last name must be at most 100 characters')
        .required('Last name is required'),
    phone_number: Yup.string()
        .matches(/^\+38\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    zip_code: Yup.string()
        .max(10, 'Zip code must be at most 10 characters'),
    address: Yup.string()
        .max(255, 'Address must be at most 255 characters')
        .nullable(),
});

const CustomerDataForm = ({ initialValues, onSubmit }) => {
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
                                label="First Name"
                                value={formik.values.first_name || ''}
                                onChange={formik.handleChange}
                                name="first_name"
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && formik.errors.first_name}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                value={formik.values.last_name || ''}
                                onChange={formik.handleChange}
                                name="last_name"
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                value={formik.values.phone_number || ''}
                                onChange={formik.handleChange}
                                name="phone_number"
                                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Zip Code"
                                value={formik.values.zip_code || ''}
                                onChange={formik.handleChange}
                                name="zip_code"
                                error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
                                helperText={formik.touched.zip_code && formik.errors.zip_code}
                                InputProps={{ sx: { backgroundColor: '#ffffff' } }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                value={formik.values.address || ''}
                                onChange={formik.handleChange}
                                name="address"
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
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
                                    sx={{width: '20%', height: '5vh'}}
                                >
                                    Submit
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


