import React, { useState,useEffect } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getserviceList,createMaterial,getMaterialList,getServiceNameById } from '../../data/ApiController.js';
import MaterialsList from './materailList';

const Material = () => {
    const [serviceList, setServiceList] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [numberOfInstalls, setNumberOfInstalls] = useState('');
    const [material,setMaterial] = useState([]);

    useEffect(() => {
        fetchMaterial();
      }, []);
    
      const fetchMaterial = async () => {
        const data = await getMaterialList();
        const temp_data = []
        
        for(let i=0;i<data.data.length;i++)
        {   
          const dataObject = data.data[i];
        
            let data_to_be_pushed = {
              id : `RC-MAT-${dataObject._id}`,
              service_name: await getServiceNameById(dataObject.service_id),
              material_name : dataObject.material_name,
              material_desc : dataObject.material_desc,
              price : dataObject.price,
              number_of_chargers: dataObject.number_of_chargers
            }
            temp_data.push(data_to_be_pushed);
            
        }
        setMaterial(temp_data);
        
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


    const handleSubmitMaterial = (event) => {
        event.preventDefault();
        const materailName = event.target.materailName.value;
        const materialDesc = event.target.materialDesc.value;
        const numberOfInstall = event.target.numberOfInstall.value;
        const price = event.target.price.value;
        const newMaterial = {
          material_name: materailName,
          material_desc: materialDesc,
          number_of_chargers: numberOfInstall,
          price:price,
          service_id: selectedService,
        };
        console.log(newMaterial)
        createMaterial(newMaterial);
        fetchMaterial();

    };
    if (!serviceList || serviceList.length === 0) {
        return <div>Sorry you have to create Services first</div>;
    }
    return (
        <div >
            <form onSubmit={handleSubmitMaterial}>
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
                                id="materailName"
                                name="materailName"
                                label="Material Name"
                                sx={{ marginLeft: '20px' }}
                            />
                            <TextField
                                id="materialDesc"
                                name="materialDesc"
                                label="Material Description"
                                sx={{ marginLeft: '20px' }}
                            />
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
            <MaterialsList material={material}  setMaterial={setMaterial} />
        </div>
    )
};
export default Material;
