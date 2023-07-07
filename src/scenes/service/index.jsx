import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createService } from "../../data/ApiController.js";

const Service = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    createService(values);
  };

  return (
    <Box m="20px">
      <Header title="Service" subtitle="Manage Services" />

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
              gridTemplateColumns={isNonMobile ? "2fr 1fr 1fr" : "1fr"}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Service Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Certification"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.certification}
                name="certification"
                error={!!touched.certification && !!errors.certification}
                helperText={touched.certification && errors.certification}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Years Of Experience"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.yearsOfExperience}
                name="yearsOfExperience"
                error={!!touched.yearsOfExperience && !!errors.yearsOfExperience}
                helperText={touched.yearsOfExperience && errors.yearsOfExperience}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Service Description"
                multiline
                rows={8}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Additional Notes"
                multiline
                rows={8}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.notes}
                name="notes"
                error={!!touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
              />
            </Box>
            <Box display="flex" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Create New Service
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  certification: yup.string().required("Required"),
  yearsOfExperience: yup.string().required("Required"),
});

const initialValues = {
  name: "",
  description: "",
  certification: "",
  yearsOfExperience: "",
};

export default Service;
