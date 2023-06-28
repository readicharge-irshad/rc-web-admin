import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import ServicePriceHelper from './servicePriceHelper'; // u1


import { createServicePrice, getserviceList } from '../../data/ApiController.js';
import { getServicePriceList,getServiceNameById } from "../../data/ApiController.js";
 const ServicePrice = () => {
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [numberOfInstalls, setNumberOfInstalls] = useState('');

  const [servicePrice, setServicePrice] = useState([]);
   useEffect(() => {
    fetchServicePrice();
  }, []);
  const fetchServicePrice = async () => {
    const data = await getServicePriceList();
    const temp_data = []
    
    for(let i=0;i<data.data.length;i++)
    {   
      const dataObject = data.data[i];
        console.log(dataObject)
        let data_to_be_pushed = {
          id:dataObject._id,
          shown_id : `RC-SEPR-${dataObject._id}`,
          service_name: await getServiceNameById(dataObject.service_id),
          number_of_installs : dataObject.number_of_installs,
          price : dataObject.price
        }
        temp_data.push(data_to_be_pushed);
        
    }
    setServicePrice(temp_data);
    
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
   const handleServicePriceSubmit =  (event) => {
    event.preventDefault();
    const price = event.target.price.value;
    const numberOfInstall = event.target.numberOfInstall.value;
    const newServicePrice = {
      price:price,
      number_of_installs: numberOfInstall,
      service_id: selectedService,
    };
    console.log(newServicePrice);
    createServicePrice(newServicePrice);
    fetchServicePrice();
  };
   if (!serviceList || serviceList.length === 0) {
    return <div>Sorry you have to create Services first</div>;
  }
   return (
    <div>
      <form onSubmit={handleServicePriceSubmit}>
        <Grid spacing={2}>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{marginLeft:"20px",minWidth:"120px"}}>
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

              <TextField
                id="numberOfInstall"
                name="numberOfInstall"
                label="Number of Installs"
                value={numberOfInstalls}
                onChange={(event) => setNumberOfInstalls(event.target.value)}
                sx={{ marginLeft: '20px' }}
              />
              <TextField
                id="price"
                name="price"
                label="Price"
                sx={{ marginLeft: '20px' }}
              />
              <Button type="submit" variant="contained" sx={{ marginLeft: '20px' }}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <ServicePriceHelper servicePrice={servicePrice} setServicePrice={setServicePrice} />
    </div>
  );
};
 export default ServicePrice;