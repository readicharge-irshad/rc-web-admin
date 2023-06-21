import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { createAdmin } from '../../data/ApiController.js';

const AdminForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values)
    createAdmin(values);
   
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    phoneNumber: yup.string().required('Phone number is required'),
  });

  const initialValues = {
    name: '',
    password: '',
    email: '',
    address: '',
    phoneNumber: '',
  };

  return (
    <Box m="20px">
      <Header title="Admin" subtitle="Admin Details" />

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
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="name"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
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
                type="tel"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Admin Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AdminForm;
