import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';


import { createBooking, getMaterialTax, getMostSuitableInstaller, getserviceList } from "../../data/ApiController.js";
import InstallerDetails from "./mappedInstaller.jsx";
import CustomerDetails from "./otherDetails.jsx";


const BookingForm = () => {
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [numberOfInstalls, setNumberOfInstalls] = useState('');
  const [mappedInstaller, setMappedInstaller] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [materialTaxId, setMaterialTaxId] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const fetchServiceList = async () => {
      const response = await getserviceList();
      const materialTax = await getMaterialTax();
      if (response && response.data) {
        setServiceList(response.data);

      }
      if (materialTax && materialTax.data) {

        setMaterialTaxId(materialTax.data[0]._id);
      }
    };
    fetchServiceList();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, []);




  const handleSubmit = async (event) => {
    event.preventDefault();
    const numberOfInstall = event.target.numberOfInstall.value;
    const state = event.target.state.value;
    const zip = event.target.zip.value;
    const date = event.target.date.value;
    const addressLine1 = event.target.addressLine1.value;
    const addressLine2 = event.target.addressLine2.value;

    const newInstallerFindingDetailsToken = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      zip: zip,
      state: state,
      date: date,
      serviceId: selectedService,
      number_of_installs: numberOfInstall,

    }
    setCustomerData(newInstallerFindingDetailsToken);

    console.log(newInstallerFindingDetailsToken);
    const response = await getMostSuitableInstaller(newInstallerFindingDetailsToken);
    console.log(response)
    if (response !== undefined) setMappedInstaller(response);
    else {
      alert("The Given Operation is not possible for the Provided Set of inputs !!! please try with other details ")
    }



  }




  const createNewObject = () => {
    const {
      materialDetails
    } = otherData;

    const {
      addressLine1,
      addressLine2,
      zip,
      state,
      date,
      serviceId,
      number_of_installs: numberOfInstall,
    } = customerData;

    const installer = mappedInstaller.data[0]._id;
    console.log(installer)


    const material_details = materialDetails.map((material) => ({
      material_id: material.materialId,
      number_of_materials: material.numInstalls,
    }));

    const newObject = {
      installer_id: installer,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      zip: zip,
      state: state,
      service: serviceId,
      time_start: 7,
      time_end: 20,
      date: date,
      paymentStatus: "Pending",
      completionStatus: false,
      number_of_installs: parseInt(numberOfInstall),
      material_details: material_details,
      material_tax_id: materialTaxId
    };

    createBooking(newObject);
  }

  return (
    <Box m="50px" style={{ overflowY: 'auto', height: 'calc(100vh - 150px)', }}>
      <Typography variant="h5" my="20px">
        Primary Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={2}>
            <FormControl fullWidth>
              <InputLabel id="service-select-label">Service</InputLabel>
              <Select
                labelId="service-select-label"
                id="service-select"
                value={selectedService._id}
                onChange={(event) => {
                  console.log(event.target.value);
                  setSelectedService(event.target.value);
                }}
                label="Service"
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#000", // Adjust the color when the input is focused
                  },
                }}
              >
                {serviceList.map((service) => (
                  <MenuItem key={service._id} value={service._id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={3} md={2}>
            <TextField
              id="numberOfInstall"
              name="numberOfInstall"
              label="Number of Installs"
              value={numberOfInstalls}
              onChange={(event) => setNumberOfInstalls(event.target.value)}
              fullWidth
            />
          </Grid>
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
          <Grid item xs={3} md={2}>
            <TextField
              id="zip"
              name="zip"
              label="Zip"
              fullWidth
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <TextField
              id="date"
              name="date"
              type="date"
             
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="addressLine1"
              name="addressLine1"
              label="Address Line 1"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="addressLine2"
              name="addressLine2"
              label="Address Line 2"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" variant="contained" fullWidth>
              Find Installer
            </Button>
          </Grid>
        </Grid>


      </form>
      {mappedInstaller.data && mappedInstaller.data.length > 0 && <InstallerDetails data={mappedInstaller.data[0]} />}
      <CustomerDetails data={mappedInstaller} setOtherData={setOtherData} />
      <Grid item xs={4} sm={3} style={{ marginTop: "6vh" }}>
        <Button variant="contained" onClick={createNewObject} style={{ padding: "20px" }}>
          Book Now
        </Button>
      </Grid>
    </Box>
  );
};
export default BookingForm;



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