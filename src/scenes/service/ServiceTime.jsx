import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ServiceTimeHelper from './ServiceTimeHelper';
import { createTime, getserviceList } from '../../data/ApiController.js';
import { getserviceTimeList,getServiceNameById } from "../../data/ApiController.js";



 const ServiceTime = () => {
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [numberOfInstalls, setNumberOfInstalls] = useState('');
  const [serviceTime, setServiceTime] = useState([]);

   useEffect(() => {
    fetchserviceTime();
  }, []);

  const fetchserviceTime = async () => {
    const data = await getserviceTimeList();
    const temp_data = []
    
    for(let i=0;i<data.data.length;i++)
    {   
      const dataObject = data.data[i];
    
        let data_to_be_pushed = {
          id : `RC-SETM-${dataObject._id}`,
          service_name: await getServiceNameById(dataObject.service_id),
          number_of_installs : dataObject.number_of_installs,
          time_min : dataObject.time_min,
          time_max : dataObject.time_max
        }
        temp_data.push(data_to_be_pushed);
        
    }
    setServiceTime(temp_data);
    
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



   const handleServiceTimeSubmit = (event) => {
    event.preventDefault();
    const serviceMinTime = event.target.serviceMinTime.value;
    const serviceMaxTime = event.target.serviceMaxTime.value;
    const numberOfInstall = event.target.numberOfInstall.value;
    const newServiceTime = {
      time_min: serviceMinTime,
      time_max: serviceMaxTime,
      number_of_installs: numberOfInstall,
      service_id: selectedService,
    };
    console.log(newServiceTime);
    createTime(newServiceTime);
    fetchserviceTime();
  };
   if (!serviceList || serviceList.length === 0) {
    return <div>Sorry you have to create Services first</div>;
  }

  
   return (
    <div>
      <form onSubmit={handleServiceTimeSubmit}>
        <Grid spacing={2}>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl sx={{ minWidth: 120, marginLeft: '20px' }}>
                <InputLabel id="service-select-label">Service</InputLabel>
                <Select
                  labelId="service-select-label"
                  id="service-select"
                  value={selectedService._id}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setSelectedService(event.target.value);
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
                id="serviceMinTime"
                name="serviceMinTime"
                label="Minimum Time"
                sx={{ marginLeft: '20px' }}
              />
              <TextField
                id="serviceMaxTime"
                name="serviceMaxTime"
                label="Maximum Time"
                sx={{ marginLeft: '20px' }}
              />
              <Button type="submit" variant="contained" sx={{ marginLeft: '20px' }}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <ServiceTimeHelper serviceTime={serviceTime} setServiceTime={setServiceTime} />
    </div>
  );
};
 export default ServiceTime;