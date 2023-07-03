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
    const newChargerDetails = {
      model: '',
      type: '',
      Charger_received_by: '',
      exsisting_outlet: '',
      upgraded_to_nema: '',
      charger_location: '',
      attached_home: '',
      electrical_panel_location: '',
      floor: '',
      interior_wall_finish: '',
      exterior_wall_finish: '',
      wall_construction: '',
      electrical_panel_type: '',
      panel_brand: '',
      main_breaker_size: '',
      greater_equal: '',
      open_breakers: '',
      recessed_panel: '',
      distance_panel: '',
      // Add other charger details fields here
    };
    setChargerDetails([...chargerDetails, newChargerDetails]);
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

  const handleChargerDetailsChange = (event, chargerIndex, fieldName) => {
    const { value } = event.target;
    const updatedChargerDetails = [...chargerDetails];
  
    if (chargerIndex >= updatedChargerDetails.length) {
      const newChargerDetails = { [fieldName]: value };
      updatedChargerDetails.push(newChargerDetails);
    } else {
      updatedChargerDetails[chargerIndex] = {
        ...updatedChargerDetails[chargerIndex],
        [fieldName]: value,
      };
    }
  
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

    const chargerDetailsForMaterial = chargerDetails.map((charger) => {
      return {
        model: charger.model,
        type: charger.type,
        charger_received_by: charger.Charger_received_by,
        exsisting_outlet: charger.exsisting_outlet,
        upgraded_to_nema: charger.upgraded_to_nema,
        charger_location: charger.charger_location,
        attached_home: charger.attached_home,
        electrical_panel_location: charger.electrical_panel_location,
        floor: charger.floor,
        interior_wall_finish: charger.interior_wall_finish,
        exterior_wall_finish: charger.exterior_wall_finish,
        wall_construction: charger.wall_construction,
        electrical_panel_type: charger.electrical_panel_type,
        panel_brand: charger.panel_brand,
        main_breaker_size: charger.main_breaker_size,
        greater_equal: charger.greater_equal,
        open_breakers: charger.open_breakers,
        recessed_panel: charger.recessed_panel,
        distance_panel: charger.distance_panel,
        // Include other charger details fields here
      };
    });

    const formDetails = {
      materialDetails,
      chargerDetailsForMaterial,
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
          <Grid item xs={12} style={{ display: "flex" }}>
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
              sx={{ minWidth: "120px" }}

            >
              {materialList.map((material) => (
                <MenuItem key={material.id} value={material.id} >
                  {material.material_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {addedMaterials.map((addedMaterial, index) => (
            <Box key={index} style={{ display: 'flex', margin: '10px', padding: '10px' }}>
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


          <Grid item xs={12} style={{ display: "flex" }} >
            <Button variant="contained" onClick={handleAddCharger}>
              Add Charger
            </Button>

            <TextField
              label="Number of Chargers"
              select
              value={numOfInstalls}
              onChange={handleNumOfInstallsChange}
              sx={{ marginLeft: '10px', minWidth: "120px" }}
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
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "model")
                    }
                  />
                  <TextField
                    label="Type"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "type")
                    }
                  />
                  <TextField
                    label="Charger received by"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "Charger_received_by")
                    }
                  />
                  <TextField
                    label="Existing Outlet"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "exsisting_outlet")
                    }
                  />
                  <TextField
                    label="Upgraded to NEMA"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "upgraded_to_nema")
                    }
                  />
                  <TextField
                    label="Charger Location"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "charger_location")
                    }
                  />
                  <TextField
                    label="Attached to Home"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "attached_home")
                    }
                  />
                  <TextField
                    label="Electrical Panel Location"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "electrical_panel_location")
                    }
                  />
                  <TextField
                    label="Floor"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "floor")
                    }
                  />
                  <TextField
                    label="Interior Wall Finish"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "interior_wall_finish")
                    }
                  />
                  <TextField
                    label="Exterior Wall Finish"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "exterior_wall_finish")
                    }
                  />
                  <TextField
                    label="Wall Construction"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "wall_construction")
                    }
                  />
                  <TextField
                    label="Electrical Panel Type"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "electrical_panel_type")
                    }
                  />
                  <TextField
                    label="Panel Brand"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "panel_brand")
                    }
                  />
                  <TextField
                    label="Main Breaker Size"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "main_breaker_size")
                    }
                  />
                  <TextField
                    label="Greater/Equal"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "greater_equal")
                    }
                  />
                  <TextField
                    label="Open Breakers"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "open_breakers")
                    }
                  />
                  <TextField
                    label="Recessed Panel"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "recessed_panel")
                    }
                  />
                  <TextField
                    label="Distance Panel"
                    style={{ margin: "4px" }}
                    xs={3}
                    onChange={(event) =>
                      handleChargerDetailsChange(event, index, "distance_panel")
                    }
                  />
                </Box>
              )}
            </Grid>
          ))}


          <Grid item xs={4} style={{ marginTop: "20px" }}>
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
