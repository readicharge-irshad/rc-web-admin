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
import Header from "../../components/Header.jsx";
import CostDetails from "./payment.jsx";


const BookingForm = ({admin}) => {
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [numberOfInstalls, setNumberOfInstalls] = useState('');
  const [mappedInstaller, setMappedInstaller] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [materialTaxId, setMaterialTaxId] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [materialCost, setMaterialCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [customerCost, setCustomerCost] = useState('');
  const [bookingStatus,setBookingStatus] = useState(false);
  const [bookingId,setBookingId] = useState("");

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
    const city = event.target.city.value;

    const newInstallerFindingDetailsToken = {
      addressLine1: addressLine1,
      city: city,
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




  const createNewObject =  async () => {
    const {
      materialDetails,
      chargerDetailsForMaterial
    } = otherData;

    const {
      addressLine1,
      city,
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
      city: city,
      zip: zip,
      state: state,
      service: serviceId,
      time_start: 7,
      time_end: 20,
      date: date,
      paymentStatus: "Pending",
      completionStatus: false,
      number_of_installs: parseInt(numberOfInstall),
      charger_details:chargerDetailsForMaterial,
      material_details: material_details,
      material_tax_id: materialTaxId,
      changedBy:admin
    };

   const response= await createBooking(newObject);
   console.log(response)
    if(response.status===201)
    {
      setBookingStatus(true);
      setBookingId(response.data.booking._id)
      setMaterialCost(response.data.booking.materialCost);
      setLaborCost(response.data.booking.labourRates);
      setCustomerCost(response.data.booking.customerShowingCost);
    }
    else{
      alert("Booking not Created !!!")
    }
  }

  return (
 <Box style={{paddingLeft:"30px"}}>
    <Header title="Book A Ticket" subtitle="Create a New Ticket for the Installation"  />
    <Box
      m="50px"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 150px)",
        background: "linear-gradient(to bottom, #f5f5f5, #FFFFFF)",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      
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
            <TextField id="zip" name="zip" label="Zip" fullWidth />
          </Grid>
          <Grid item xs={3} md={2}>
            <TextField id="date" name="date" type="date" fullWidth />
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
              id="city"
              name="city"
              label="City"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#F0DD5D",
                color: "#000",
                borderRadius: "8px",
              }}
            >
              Find Installer
            </Button>
          </Grid>
        </Grid>
      </form>
      {mappedInstaller.data && mappedInstaller.data.length > 0 && (
        <InstallerDetails data={mappedInstaller.data[0]} />
      )}
      <CustomerDetails data={mappedInstaller} setOtherData={setOtherData} />
      <Grid item xs={4} sm={3} style={{ marginTop: "6vh" }}>
        <Button
          variant="contained"
          onClick={createNewObject}
          style={{
            padding: "20px",
            backgroundColor: "#96D232",
            color: "#fff",
            borderRadius: "8px",
          }}
        >
          Book Now
        </Button>
      </Grid>
      { bookingStatus && (
        <CostDetails laborCost={laborCost} materialCost={materialCost} customerCost={customerCost} bookingId={bookingId}/>
      )}
    </Box></Box>

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
