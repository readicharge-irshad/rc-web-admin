
import { Box, Button, TextField, Tab, Tabs, Typography, buttonGroupClasses } from "@mui/material";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { getserviceList, createInstaller } from "../../data/ApiController.js";



const InstallerForm = () => {
  const [isDateActive, setIsDateActive] = useState(false);
  const [isFileActive, setIsFileActive] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const fetchServiceList = async () => {
      const response = await getserviceList();
      if (response && response.data) {
        setServiceList(response.data);
      }
    };
    fetchServiceList();
  }, []);

  const handleDateFocus = () => {
    setIsDateActive(true);
  };

  const handleDateBlur = () => {
    setIsDateActive(false);
  };


  const handleFileFocus = () => {
    setIsFileActive(true);
  };

  const handleFileBlur = () => {
    setIsFileActive(false);
  };

  const handleToggle = (service) => () => {
    const currentIndex = selectedServices.indexOf(service);
    const newSelectedServices = [...selectedServices];

    if (currentIndex === -1) {
      newSelectedServices.push(service);
    } else {
      newSelectedServices.splice(currentIndex, 1);
    }

    setSelectedServices(newSelectedServices);
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = useState({});

  const handleFormSubmit_01 = (event) => {
    event.preventDefault();
    const fields = [
      'user_id', 'firstName', 'lastName', 'companyName', 'email', 'password',
      'phoneNumber', 'yearsOfExperience', 'description', 'addressLine1',
      'addressLine2', 'city', 'zip', 'miles_distance', 'state'
    ];
    const data = fields.reduce((acc, field) => {
      acc[field] = event.target[field].value;
      return acc;
    }, {});
    setFormData1(data);
  };

  const handleFormSubmit_02 = (event) => {
    event.preventDefault();
    const fields = [
      'licenseNumber', 'licenseExpirationDate', 'businessInsuranceCompany',
      'businessInsuranceNumber', 'businessAgentPhoneNumber', 'businessPolicyNumber',
      'businessInsuranceEffectiveStartDate', 'businessInsuranceEffectiveEndDate',
      'bondingCertificationNumber', 'bondingCompany', 'bondingAgentPhoneNumber',
      'bondAmount', 'bondingEffectiveStartDate', 'bondingEffectiveEndDate'
    ];
    const data = fields.reduce((acc, field) => {
      acc[field] = event.target[field].value;
      return acc;
    }, {});
    setFormData2(data);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const selectedServiceIds = selectedServices.map((service) => service._id);
    const newInstaller = { ...formData1, ...formData2, "services": selectedServiceIds };
    console.log(newInstaller);
    createInstaller(newInstaller);
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);

  };


  return (
    <Box m="20px">
      <Header title="Installer Details" subtitle="View and Update your Installer team details" />

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Personal Information" sx={{ '&.Mui-selected': { backgroundColor: '#96D232', borderRadius: '20px 20px 0px 0px', color: '#fff' } }}>
        </Tab>
        <Tab label="Licenses & Insurance" sx={{ '&.Mui-selected': { backgroundColor: '#96D232', borderRadius: '20px 20px 0px 0px' } }}>
        </Tab>
        <Tab label="Additional Information" sx={{ '&.Mui-selected': { backgroundColor: '#96D232', borderRadius: '20px 20px 0px 0px' } }}>
        </Tab>
      </Tabs>


      <form onSubmit={handleFormSubmit_01}
      >
        {tabIndex === 0 && (
          // Personal Information
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            {/* Add Personal Information fields here */}

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="User ID"


              //value={values.user_id}
              name="user_id"
              id="user_id"

              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="First Name"


              //value={values.firstName}
              name="firstName"
              id="firstName"

              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"


              //value={values.lastName}
              name="lastName"
              id="lastName"
              //error={!!touched.lastName && !!errors.lastName}
              //helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Company Name"


              //value={values.companyName}
              name="companyName"
              id="companyName"
              //error={!!touched.companyName && !!errors.companyName}
              //helperText={touched.companyName && errors.companyName}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"


              //value={values.email}
              name="email"
              id="email"
              //error={!!touched.email && !!errors.email}
              //helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              fullWidth
              variant="filled"
              type="password"
              label="Password"


              //value={values.password}
              name="password"
              id="password"
              //error={!!touched.password && !!errors.password}
              //helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />



            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Phone Number"


              //value={values.phoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              //error={!!touched.phoneNumber && !!errors.phoneNumber}
              //helperText={touched.phoneNumber && errors.phoneNumber}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Years of Experience"


              //value={values.yearsOfExperience}
              name="yearsOfExperience"
              id="yearsOfExperience"
              //error={!!touched.yearsOfExperience && !!errors.yearsOfExperience}
              //helperText={touched.yearsOfExperience && errors.yearsOfExperience}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Description"


              //value={values.description}
              name="description"
              id="description"
              //error={!!touched.description && !!errors.description}
              //helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address Line 1"


              //value={values.addressLine1}
              name="addressLine1"
              id="addressLine1"
              //error={!!touched.addressLine1 && !!errors.addressLine1}
              //helperText={touched.addressLine1 && errors.addressLine1}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address Line 2"


              //value={values.addressLine2}
              name="addressLine2"
              id="addressLine2"
              //error={!!touched.addressLine2 && !!errors.addressLine2}
              //helperText={touched.addressLine2 && errors.addressLine2}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="City"


              //value={values.city}
              name="city"
              id="city"
              //error={!!touched.city && !!errors.city}
              //helperText={touched.city && errors.city}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Zip"


              //value={values.zip}
              name="zip"
              id="zip"
              //error={!!touched.zip && !!errors.zip}
              //helperText={touched.zip && errors.zip}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Miles Distance"


              //value={values.miles_distance}
              name="miles_distance"
              id="miles_distance"
              //error={!!touched.miles_distance && !!errors.miles_distance}
              //helperText={touched.miles_distance && errors.miles_distance}
              sx={{ gridColumn: "span 2" }}
            />
            <Grid item xs={3} md={2}>
              <FormControl fullWidth>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state"
                  name="state"
                  value={selectedState}
                  onChange={(event) => setSelectedState(event.target.value)}
                >
                  {usStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit"  style={{backgroundColor:"#F0DD5D" , padding:"8px"}} variant="contained">
                Submit and Continue
              </Button>
            </Box>

          </Box>
        )}

      </form>
      <form onSubmit={handleFormSubmit_02}
      >
        {tabIndex === 1 && (
          // Company Information
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            {/* Add Company Information fields here */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="License Number"


              //value={values.licenseNumber}
              name="licenseNumber"
              id="licenseNumber"
              //error={!!touched.licenseNumber && !!errors.licenseNumber}
              //helperText={touched.licenseNumber && errors.licenseNumber}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label={isDateActive ? "" : "License Expiration Date"}
              onBlur={handleDateBlur}
              onFocus={handleDateFocus}
              name="licenseExpirationDate"
              id="licenseExpirationDate"
              sx={{ gridColumn: "span 1", display: "flex" }}

              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isDateActive ? "none" : "block"
                }
              }}
              inputProps={{ style: { width: "100%" } }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label={isFileActive ? "" : "Image License"}
              onBlur={handleFileBlur}
              onFocus={handleFileFocus}
              name="imageLicense"
              id="imageLicense"
              //error={!!touched.imageLicense && !!errors.imageLicense}
              //helperText={touched.imageLicense && errors.imageLicense}
              sx={{ gridColumn: "span 1" }}
              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isFileActive ? "none" : "block"
                }
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label={isFileActive ? "" : "PDF License"}


              //value={values.pdfLicense}
              name="pdfLicense"
              id="pdfLicense"
              //error={!!touched.pdfLicense && !!errors.pdfLicense}
              //helperText={touched.pdfLicense && errors.pdfLicense}
              sx={{ gridColumn: "span 1" }}
              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isFileActive ? "none" : "block"
                }
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Business Insurance Number"


              //value={values.businessInsuranceNumber}
              name="businessInsuranceNumber"
              //error={!!touched.businessInsuranceNumber && !!errors.businessInsuranceNumber}
              //helperText={touched.businessInsuranceNumber && errors.businessInsuranceNumber}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Business Insurance Company"


              //value={values.businessInsuranceCompany}
              name="businessInsuranceCompany"
              id="businessInsuranceCompany"
              //error={!!touched.businessInsuranceCompany && !!errors.businessInsuranceCompany}
              //helperText={touched.businessInsuranceCompany && errors.businessInsuranceCompany}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="tel"
              label="Business Agent Phone Number"


              //value={values.businessAgentPhoneNumber}
              name="businessAgentPhoneNumber"
              id="businessAgentPhoneNumber"
              //error={!!touched.businessAgentPhoneNumber && !!errors.businessAgentPhoneNumber}
              //helperText={touched.businessAgentPhoneNumber && errors.businessAgentPhoneNumber}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Business Policy Number"


              //value={values.businessPolicyNumber}
              name="businessPolicyNumber"
              id="businessPolicyNumber"
              //error={!!touched.businessPolicyNumber && !!errors.businessPolicyNumber}
              //helperText={touched.businessPolicyNumber && errors.businessPolicyNumber}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label={isDateActive ? "" : "Business Insurance Effective Start Date"}


              //value={values.businessInsuranceEffectiveStartDate}
              name="businessInsuranceEffectiveStartDate"
              id="businessInsuranceEffectiveStartDate"
              //error={!!touched.businessInsuranceEffectiveStartDate && !!errors.businessInsuranceEffectiveStartDate}
              //helperText={touched.businessInsuranceEffectiveStartDate && errors.businessInsuranceEffectiveStartDate}
              sx={{ gridColumn: "span 1", display: "flex" }}

              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isDateActive ? "none" : "block"
                }
              }}
              inputProps={{ style: { width: "100%" } }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label={isDateActive ? "" : "Business Insurance Effective End Date"}


              //value={values.businessInsuranceEffectiveEndDate}
              name="businessInsuranceEffectiveEndDate"
              id="businessInsuranceEffectiveEndDate"
              //error={!!touched.businessInsuranceEffectiveEndDate && !!errors.businessInsuranceEffectiveEndDate}
              //helperText={touched.businessInsuranceEffectiveEndDate && errors.businessInsuranceEffectiveEndDate}
              sx={{ gridColumn: "span 1", display: "flex" }}

              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isDateActive ? "none" : "block"
                }
              }}
              inputProps={{ style: { width: "100%" } }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label={isFileActive ? "" : "Image Business Insurance"}


              //value={values.imageBusinessInsurance}
              name="imageBusinessInsurance"
              id="imageBusinessInsurance"
              //error={!!touched.imageBusinessInsurance && !!errors.imageBusinessInsurance}
              //helperText={touched.imageBusinessInsurance && errors.imageBusinessInsurance}
              sx={{ gridColumn: "span 1" }}
              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isFileActive ? "none" : "block"
                }
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label={isFileActive ? "" : "PDF Business Insurance"}


              //value={values.pdfBusinessInsurance}
              name="pdfBusinessInsurance"
              id="pdfBusinessInsurance"
              //error={!!touched.pdfBusinessInsurance && !!errors.pdfBusinessInsurance}
              //helperText={touched.pdfBusinessInsurance && errors.pdfBusinessInsurance}
              sx={{ gridColumn: "span 1" }}
              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isFileActive ? "none" : "block"
                }
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Bonding Certification Number"


              //value={values.bondingCertificationNumber}
              name="bondingCertificationNumber"
              id="bondingCertificationNumber"
              //error={!!touched.bondingCertificationNumber && !!errors.bondingCertificationNumber}
              //helperText={touched.bondingCertificationNumber && errors.bondingCertificationNumber}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Bonding Company"


              //value={values.bondingCompany}
              name="bondingCompany"
              id="bondingCompany"
              //error={!!touched.bondingCompany && !!errors.bondingCompany}
              //helperText={touched.bondingCompany && errors.bondingCompany}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="tel"
              label="Bonding Agent Phone Number"


              //value={values.bondingAgentPhoneNumber}
              name="bondingAgentPhoneNumber"
              id="bondingAgentPhoneNumber"
              //error={!!touched.bondingAgentPhoneNumber && !!errors.bondingAgentPhoneNumber}
              //helperText={touched.bondingAgentPhoneNumber && errors.bondingAgentPhoneNumber}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Bond Amount"


              //value={values.bondAmount}
              name="bondAmount"
              id="bondAmount"
              //error={!!touched.bondAmount && !!errors.bondAmount}
              //helperText={touched.bondAmount && errors.bondAmount}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label={isDateActive ? "" : "Bonding Effective Start Date"}


              //value={values.bondingEffectiveStartDate}
              name="bondingEffectiveStartDate"
              id="bondingEffectiveStartDate"
              //error={!!touched.bondingEffectiveStartDate && !!errors.bondingEffectiveStartDate}
              //helperText={touched.bondingEffectiveStartDate && errors.bondingEffectiveStartDate}
              sx={{ gridColumn: "span 1", display: "flex" }}

              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isDateActive ? "none" : "block"
                }
              }}
              inputProps={{ style: { width: "100%" } }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label={isDateActive ? "" : "Bonding Effective End Date"}


              //value={values.bondingEffectiveEndDate}
              name="bondingEffectiveEndDate"
              id="bondingEffectiveEndDate"
              //error={!!touched.bondingEffectiveEndDate && !!errors.bondingEffectiveEndDate}
              //helperText={touched.bondingEffectiveEndDate && errors.bondingEffectiveEndDate}
              sx={{ gridColumn: "span 1", display: "flex" }}

              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isDateActive ? "none" : "block"
                }
              }}
              inputProps={{ style: { width: "100%" } }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label={isFileActive ? "" : "Image Bonding"}


              //value={values.imageBonding}
              name="imageBonding"
              id="imageBonding"
              //error={!!touched.imageBonding && !!errors.imageBonding}
              //helperText={touched.imageBonding && errors.imageBonding}
              sx={{ gridColumn: "span 1" }}
              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isFileActive ? "none" : "block"
                }
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="file"
              label={isFileActive ? "" : "PDF Bonding"}


              //value={values.pdfBonding}
              name="pdfBonding"
              id="pdfBonding"
              //error={!!touched.pdfBonding && !!errors.pdfBonding}
              //helperText={touched.pdfBonding && errors.pdfBonding}
              sx={{ gridColumn: "span 1" }}
              InputLabelProps={{
                shrink: true,
                style: {
                  paddingRight: "20px",
                  display: isFileActive ? "none" : "block"
                }
              }}
            />
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" style={{backgroundColor:"#F0DD5D" , padding:"8px"}} variant="contained">
                Submit and Continue
              </Button>
            </Box>
          </Box>
        )}

      </form>
      <form onSubmit={handleFormSubmit}
      >
        {tabIndex === 2 && (
          // Licenses & Insurance
          <>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              {/* Add Service related fields here */}


              <List>
                {serviceList.map((service) => {
                  const labelId = `${service._id}`;

                  return (
                    <ListItem key={service.name} dense onClick={handleToggle(service)}>
                      <ListItemText id={labelId} primary={service.name} />
                      <FormControlLabel
                        control={<Switch checked={selectedServices.indexOf(service) !== -1} />}
                        label=""
                        style={{
                          color: selectedServices.indexOf(service) !== -1 ? '#94d034' : undefined,
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>

          </>

        )}

      </form>





    </Box>
  );
};
// Update initialValues and checkoutSchema with all the fields from the Installer model
export default InstallerForm;





const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];




