import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
} from '@mui/material';
import { getMaterialList, getServiceNameById } from '../../data/ApiController.js';

const CustomerDetails = ({ setOtherData, data }) => {
  const [numOfInstalls, setNumOfInstalls] = useState(1);
  const [showChargerDetails, setShowChargerDetails] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [addedMaterials, setAddedMaterials] = useState([]);
  const [chargerDetails, setChargerDetails] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [formData, setFormData] = useState({
    customerName: data.customerName || '',
    houseBuildYear: data.houseBuildYear || '',
    pre1990PanelUpgraded: data.pre1990PanelUpgraded || false,
    ownRent: data.ownRent || '',
  });

  useEffect(() => {
    fetchMaterial();
  }, []);

  const fetchMaterial = async () => {
    const materialData = await getMaterialList();
    const tempData = [];

    for (let i = 0; i < materialData.data.length; i++) {
      const dataObject = materialData.data[i];

      let dataToBePushed = {
        id: dataObject._id,
        service_name: await getServiceNameById(dataObject.service_id),
        material_name: dataObject.material_name,
        material_desc: dataObject.material_desc,
        price: dataObject.price,
        number_of_chargers: dataObject.number_of_chargers,
      };
      tempData.push(dataToBePushed);
    }
    setMaterialList(tempData);
  };

  const handleAddCharger = () => {
    setShowChargerDetails(true);
  };

  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  const handleAddMaterial = () => {
    if (!addedMaterials.some((material) => material.materialId === selectedMaterial)) {
      const newMaterial = {
        materialId: selectedMaterial,
        numInstalls: 0,
      };
      setAddedMaterials([...addedMaterials, newMaterial]);
    }
  };

  const handleNumInstallsChange = (event, materialId) => {
    const updatedMaterials = addedMaterials.map((material) => {
      if (material.materialId === materialId) {
        return {
          ...material,
          numInstalls: event.target.value,
        };
      }
      return material;
    });
    setAddedMaterials(updatedMaterials);
  };

  const handleNumOfInstallsChange = (event) => {
    setNumOfInstalls(event.target.value);
  };

  const handleChargerDetailsChange = (event, chargerIndex) => {
    const { name, value } = event.target;
    const updatedChargerDetails = [...chargerDetails];
    const chargerDetailsObj = updatedChargerDetails[chargerIndex] || {};

    chargerDetailsObj[name] = value;
    updatedChargerDetails[chargerIndex] = chargerDetailsObj;

    setChargerDetails(updatedChargerDetails);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const materialDetails = addedMaterials.map((material) => {
      const { materialId, numInstalls } = material;
      return {
        materialId,
        numInstalls,
      };
    });

    const formDetails = {
      materialDetails,
      chargerDetails,
      ...formData,
    };

    console.log(formDetails);

    setOtherData(formDetails);
  };

  return (
    <Box >
      <Typography variant="h5" my="20px">
        Customer Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3} sm={2}>
            <TextField
              label="Customer Name"
              value={formData.customerName}
              fullWidth
              onChange={(event) =>
                setFormData({ ...formData, customerName: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField
              label="House Build Year"
              value={formData.houseBuildYear}
              fullWidth
              onChange={(event) =>
                setFormData({ ...formData, houseBuildYear: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.pre1990PanelUpgraded}
                  onChange={(event) =>
                    setFormData({ ...formData, pre1990PanelUpgraded: event.target.checked })
                  }
                />
              }
              label="Pre-1990 Panel Upgraded"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Own / Rent"
              value={formData.ownRent}
              fullWidth
              onChange={(event) =>
                setFormData({ ...formData, ownRent: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} style={{display:"flex"}}>
            <Button
              variant="contained"
              onClick={handleAddMaterial}
              style={{ marginRight: '10px' }}
              sm={6}
            >
              Add Material
            </Button>
            <TextField
              select
              label="Select Material"
              value={selectedMaterial}
              onChange={handleMaterialChange}
              sx={{minWidth:"120px"}}
             
            >
              {materialList.map((material) => (
                <MenuItem key={material.id} value={material.id} >
                  {material.material_name}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            {addedMaterials.map((addedMaterial, index) => (
              <Box key={index} style={{ display: 'flex' ,margin: '10px', padding: '10px' }}>
                <TextField
                  label="Material"
                  value={materialList.find((material) => material.id === addedMaterial.materialId)?.material_name}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Number of Installs"
                  value={addedMaterial.numInstalls}
                  onChange={(event) =>
                    handleNumInstallsChange(event, addedMaterial.materialId)
                  }
                  fullWidth
                  sx={{ marginLeft: '10px' }}
                />
              </Box>
            ))}
        
  
          <Grid item xs={12} style={{display:"flex"}} >
            <Button variant="contained" onClick={handleAddCharger}>
              Add Charger
            </Button>
  
            <TextField
              label="Number of Chargers"
              select
              value={numOfInstalls}
              onChange={handleNumOfInstallsChange}
              sx={{ marginLeft: '10px' , minWidth:"120px"}}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </TextField>
          </Grid>
          {Array.from({ length: numOfInstalls }, (_, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="h6" my="20px">
                Charger {index + 1} Details
              </Typography>
              {showChargerDetails && (
                <Box>
                  <TextField
                    label="Model of Charger"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "modelOfCharger")
                    }
                  />
                  <TextField
                    label="Type"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "type")
                    }
                  />
                  <TextField
                    label="Date when purchased"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "datePurchased")
                    }
                  />
                  <TextField
                    label="Existing Outlet"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "existingOutlet")
                    }
                  />
                  <TextField
                    label="Breaker Size"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "breakerSize")
                    }
                  />
                  <TextField
                    label="Is GFCI required"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "isGFCIRequired")
                    }
                  />
                  <TextField
                    label="Existing Charger"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "existingCharger")
                    }
                  />
                  <TextField
                    label="Electricity Meter"
                    style={{margin:"4px"}}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "electricityMeter")
                    }
                  />
                </Box>
              )}
            </Grid>
          ))}
          <Grid item xs={4} style={{marginTop:"20px"}}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit  Customer  Details
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CustomerDetails;
