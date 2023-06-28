
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



const InstallerForm = ({changedBy}) => {
  const [isDateActive, setIsDateActive] = useState(false);
  const [isFileActive, setIsFileActive] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [milesDistance, setMilesDistance] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [bondAmount, setBondAmount] = useState("");
  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = useState({});

  const handleBondAmountChange = (event) => {
    const value = event.target.value;
    setBondAmount(value);
  };

  const handleBondAmountBlur = () => {
    if (bondAmount < 10000) {
      setBondAmount("10000");
    }
  };

  useEffect(() => {
    const fetchServiceList = async () => {
      const response = await getserviceList();
      if (response && response.data) {
        setServiceList(response.data);
      }
    };
    fetchServiceList();
  }, []);

  const handleYearsOfExperienceChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 25) {
      setYearsOfExperience(value);
    }
  };

  const handleMilesDistanceChange = (event) => {
    setFormData1((prevFormData) => ({
      ...prevFormData,
      miles_distance: event.target.value,
    }));
  };

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

  const handleFormSubmit_01 = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setFormData1(data);
  };

  const handleFormSubmit_02 = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setFormData2(data);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const selectedServiceIds = selectedServices.map((service) => service._id);
    const newInstaller = { ...formData1, ...formData2, "services": selectedServiceIds ,"changedBy":changedBy};
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
        <Tab
          label="Personal Information"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#96D232 !important",
              borderRadius: "20px 20px 0px 0px",
              color: "#fff",
            },
            "&.MuiTab-root": {
              backgroundColor: "#f0f0f0",
              borderRadius: "20px 20px 0px 0px",
            },
          }}
        />
        <Tab
          label="Licenses & Insurance"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#96D232 !important",
              borderRadius: "20px 20px 0px 0px",
              color: "#fff",
            },
            "&.MuiTab-root": {
              backgroundColor: "#f0f0f0",
              borderRadius: "20px 20px 0px 0px",
            },
          }}
        />
        <Tab
          label="Additional Information"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#96D232 !important",
              borderRadius: "20px 20px 0px 0px",
              color: "#fff",
            },
            "&.MuiTab-root": {
              backgroundColor: "#f0f0f0",
              borderRadius: "20px 20px 0px 0px",
            },
          }}
        />
      </Tabs>




      <form onSubmit={handleFormSubmit_01}>
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
              backgroundColor: "#f5f5f5",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            {/* Add Personal Information fields here */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              value={formData1.firstName}
              label="First Name"
              name="firstName"
              id="firstName"
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              value={formData1.lastName}
              name="lastName"
              id="lastName"
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Company Name"
              value={formData1.companyName}
              name="companyName"
              id="companyName"
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              value={formData1.email}
              name="email"
              id="email"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="password"
              label="Password"
              value={formData1.password}
              name="password"
              id="password"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Phone Number"
              value={formData1.phoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Years of Experience"
              value={formData1.yearsOfExperience}
              name="yearsOfExperience"
              id="yearsOfExperience"
              onChange={handleYearsOfExperienceChange}
              inputProps={{ min: 0, max: 25 }}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Description"
              value={formData1.description}
              name="description"
              id="description"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address Line 1"
              value={formData1.addressLine1}
              name="addressLine1"
              id="addressLine1"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address Line 2"
              value={formData1.addressLine2}
              name="addressLine2"
              id="addressLine2"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="City"
              value={formData1.city}
              name="city"
              id="city"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Zip"
              value={formData1.zip}
              name="zip"
              id="zip"
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
              <InputLabel id="miles-distance-label">Miles Distance</InputLabel>
              <Select
                labelId="miles-distance-label"
                id="miles_distance"
                name="miles_distance"
                value={formData1.miles_distance || ''}
                onChange={handleMilesDistanceChange}
              >
                {[5, 10, 20, 30, 40, 50].map((distance) => (
                  <MenuItem key={distance} value={distance}>
                    {distance} miles
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

            <Box display="flex" mt="20px" gridColumn="span 4">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#96D232",
                  padding: "8px",
                  color: "#fff",
                  borderRadius: "8px",
                }}
                variant="contained"
              >
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
              backgroundColor: "#f5f5f5",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "20px"
            }}
          >
            {/* Add Company Information fields here */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="License Number"


              value={formData2.licenseNumber}
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
              value={formData2.licenseExpirationDate}
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


              // value={formData2.pdfLicense}
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


              value={formData2.businessInsuranceNumber}
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


              value={formData2.businessInsuranceCompany}
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


              value={formData2.businessAgentPhoneNumber}
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


              value={formData2.businessPolicyNumber}
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


              value={formData2.businessInsuranceEffectiveStartDate}
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


              value={formData2.businessInsuranceEffectiveEndDate}
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


              // value={formData2.imageBusinessInsurance||""}
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


              // value={formData2.pdfBusinessInsurance||""}
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


              value={formData2.bondingCertificationNumber}
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


              value={formData2.bondingCompany}
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


              value={formData2.bondingAgentPhoneNumber}
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
              name="bondAmount"
              id="bondAmount"
              value={bondAmount}
              onChange={handleBondAmountChange}
              onBlur={handleBondAmountBlur}
              sx={{ gridColumn: "span 1" }}
              inputProps={{ min: 10000 }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label={isDateActive ? "" : "Bonding Effective Start Date"}


              value={formData2.bondingEffectiveStartDate}
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


              value={formData2.bondingEffectiveEndDate}
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


              // value={formData2.imageBonding||""}
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


              // value={formData2.pdfBonding||""}
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
            <Box display="flex" mt="20px">
              <Button type="submit" style={{ backgroundColor: "#96D232", padding: "8px" }} variant="contained">
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
                backgroundColor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "20px"
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
            <Box display="flex" mt="20px">
              <Button type="submit" color="primary" variant="contained">
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




