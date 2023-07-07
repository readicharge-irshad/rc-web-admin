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
  Paper,
  Box,
  Typography,
} from '@mui/material';
import Header from '../../components/Header.jsx';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getLabourRate, createLabourRate, getserviceList } from '../../data/ApiController.js';
import GeographyChart from '../../components/Geographychart_02';; // Import the GeographyChart component

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

const LabourRateForm = () => {
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [labourRatesList, setLabourRatesList] = useState([]);
  const [formState, setFormState] = useState([]);
  const [chartData1, setChartData1] = useState([]);
const [chartData2, setChartData2] = useState([]);
const [chartData3, setChartData3] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchServiceList = async () => {
      const response = await getserviceList();
      if (response && response.data) {
        setServiceList(response.data);
      }
    };
    fetchServiceList();
  }, []);

  useEffect(() => {
    const createDefaultFormState = () => {
      const defaultFormState = states.map((state) => ({
        state: state,
        prices: [0, 0, 0]
      }));
      setFormState(defaultFormState);
    };

    createDefaultFormState();
  }, []);

  async function fetchData() {
    const data = await getLabourRate();
    if (data.data) {
      console.log(data.data);
      setLabourRatesList(data.data);
      
    }
  }

  const handleInputChange = (event, index, priceIndex) => {
    const { value } = event.target;
    const updatedFormState = [...formState];
    updatedFormState[index].prices[priceIndex] = value;
    setFormState(updatedFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Submitting the form three times
    for (let i = 0; i < 3; i++) {
      const data = {
        price_statewise: formState.map((item) => ({
          state: item.state,
          price: item.prices[i]
        })),
        number_of_installs: i + 1,
        service_id: selectedService,
      };
      if (i === 0) setChartData1(data.price_statewise); // Set chartData1
      else if (i === 1) setChartData2(data.price_statewise); // Set chartData2
      else if (i === 2) setChartData3(data.price_statewise); // Set chartData3
      await createLabourRate(data);
    }

    fetchData();
  };

  const handleRowClick = (labourRate) => {
    const updatedFormState = labourRate.price_statewise.map((correspondingItem) => {
      const correspondingState = formState.find((item) => item.state === correspondingItem.state);
      const prices = correspondingState ? correspondingState.prices : [0, 0, 0];
      return { state: correspondingItem.state, prices };
    });

    setSelectedService(labourRate.service_id);
    setFormState(updatedFormState);
  };

  const getCountBasedPadStart = (count) => {
    if (count <= 3) {
      return 1;
    } else {
      return 2;
    }
  };

  const handleServiceSelect = (event) => {
    const selectedServiceId = event.target.value;
    const selectedLabourRates = labourRatesList.filter((labourRate) => labourRate.service_id === selectedServiceId);

    if (selectedLabourRates && selectedLabourRates.length > 0) {
      const updatedFormState = states.map((state) => {
        const prices = selectedLabourRates.map((labourRate) => {
          const correspondingStatePrice = labourRate.price_statewise.find((item) => item.state === state);
          return correspondingStatePrice ? correspondingStatePrice.price : 0;
        });
        return { state: state, prices: prices };
      });

      setFormState(updatedFormState);
    }

    setSelectedService(selectedServiceId);
  };


  if (!serviceList || serviceList.length === 0) {
    return <div>Sorry, you have to create Services first</div>;
  }


  return (
    <>
      <Header title="Labor Rates" subtitle="Manage your labor rate" />
      <div style={{ display: 'flex' }}>

        <FormControl sx={{ minWidth: 120, marginLeft: '20px' }}>
          <InputLabel id="service-select-label">Service</InputLabel>
          <Select
            labelId="service-select-label"
            id="service-select"
            value={selectedService}
            onChange={handleServiceSelect}
          >
            {serviceList.map((service) => (
              <MenuItem key={service._id} value={service._id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <form onSubmit={handleSubmit}>
          <Grid spacing={8}>
            <Grid container item>
              <div style={{ height: '70vh', overflow: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>State</TableCell>
                      <TableCell>Price 1</TableCell>
                      <TableCell>Price 2</TableCell>
                      <TableCell>Price 3</TableCell>
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
                        {item.prices.map((price, priceIndex) => (
                          <TableCell key={priceIndex}>
                            <TextField
                              name={`price_statewise[${index}][prices][${priceIndex}]`}
                              value={price}
                              onChange={(event) =>
                                handleInputChange(event, index, priceIndex)
                              }
                              fullWidth
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" fullWidth style={{ padding: "20px" }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Paper sx={{ backgroundColor: "#f5f5f5", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#96D232" }}>Service ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#96D232" }}>Number of Installs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labourRatesList.map((labourRate, index) => {
                const count = Math.floor(index / 3) + 1;
                const padStartCount = getCountBasedPadStart(count);
                const serviceId = `RC-SERV-${count.toString().padStart(padStartCount, "0")}`;

                return (
                  <TableRow
                    key={labourRate._id}
                    onClick={() => handleRowClick(labourRate)}
                    style={{ cursor: "pointer", backgroundColor: "#ffffff" }}
                  >
                    <TableCell>{serviceId}</TableCell>
                    <TableCell>{labourRate.number_of_installs}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
      
      {/* Add geographyChart three times */}
{/*       <Box mt={4} display="flex" justifyContent="space-between">
      <Box width="30%">
  <Typography variant="h6" mb={2}>
    Geography Chart 1
  </Typography>
  <Paper sx={{ height: 400 }}>
    <GeographyChart data={chartData1} />
  </Paper>
</Box>
<Box width="30%">
  <Typography variant="h6" mb={2}>
    Geography Chart 2
  </Typography>
  <Paper sx={{ height: 400 }}>
    <GeographyChart data={chartData2} />
  </Paper>
</Box>
<Box width="30%">
  <Typography variant="h6" mb={2}>
    Geography Chart 3
  </Typography>
  <Paper sx={{ height: 400 }}>
    <GeographyChart data={chartData3} />
  </Paper>
</Box>

      </Box> */}
    </>
  );
};

export default LabourRateForm;
