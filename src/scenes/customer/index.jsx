import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { createService } from '../../data/ApiController.js';

const CustomerForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    address: yup.string().required('Address is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    additionalDetails: yup.string(),
  });

  const initialValues = {
    firstName: '',
    address: '',
    email: '',
    phoneNumber: '',
    additionalDetails: '',
  };

  return (
    <Box m="20px">
      <Header title="Customer" subtitle="Customer Details" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 2' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Additional Details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.additionalDetails}
                name="additionalDetails"
                error={!!touched.additionalDetails && !!errors.additionalDetails}
                helperText={touched.additionalDetails && errors.additionalDetails}
                multiline
                rows={4}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Customer Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CustomerForm;
