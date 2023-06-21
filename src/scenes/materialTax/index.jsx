import React, { useState, useEffect } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import GeographyChart from '../../components/GeographyChart_01';
import { getMaterialTax, createMaterialTax } from '../../data/ApiController.js';


const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];


 const MaterialTaxForm = () => {
  const [formState, setFormState] = useState(
    states.map((state) => ({ state, percentage: 0 }))
  );
   useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const data = await getMaterialTax();
    if (data.data.length>0) {
      const updatedFormState = formState.map((formStateItem) => {
        const correspondingItem = data.data[0].price_statewise.find(
          (item) => item.state === formStateItem.state
        );
        if (correspondingItem) {
          return { state: correspondingItem.state, percentage: correspondingItem.percentage };
        } else {
          return { state: formStateItem.state, percentage: 0 };
        }
      });
      setFormState(updatedFormState);
    }
  }
   const handleInputChange = (event, index, key) => {
    const { value } = event.target;
    const updatedFormState = [...formState];
    updatedFormState[index][key] = value;
    setFormState(updatedFormState);
  };
   const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      price_statewise: formState,
    };
    console.log(data);
    await createMaterialTax(data);
    fetchData();
  };
   return (
    <div style={{ display: 'flex' }}>
      <form onSubmit={handleSubmit}>
        <Grid spacing={2}>
          <Grid container item>
            <div style={{ height: '88vh', overflow: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formState.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          name={`price_statewise[${index}][state]`}
                          value={item.state}
                          disabled
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name={`price_statewise[${index}][percentage]`}
                          value={item.percentage}
                          onChange={(event) =>
                            handleInputChange(event, index, 'percentage')
                          }
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        padding="30px"
      >
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ marginBottom: '15px' }}
        >
        Material Tax Across Country
        </Typography>
        <Box height="100vh" width="50vw">
          <GeographyChart data={formState} />
        </Box>
      </Box>
    </div>
  );
};
 export default MaterialTaxForm;


