import { useState, useEffect } from "react";
import { Box , Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { deleteMaterialById } from "../../data/ApiController.js";

// import { deleteMaterial, getMaterials } from "api/materials";




 const MaterialList = ({material,setMaterial}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


  


   const handleDelete = async (id) => {
    console.log(id)
    await deleteMaterialById(id);
    setMaterial(material.filter((st) => st.id !== id));
  };
  const columns = [
    { field: "shown_id", headerName: "ID", width: 100 },
    { field: "material_name", headerName: "Material Name", width: 100 },
    { field: "material_desc", headerName: "Material Description", width: 100 },
    { field: "service_name", headerName: "Service", width: 100 },
    { field: "number_of_chargers", headerName: "Number of Installs", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];
   return (
    <Box m="20px">
 
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#94d034",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#f0f0f0",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#94d034",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[700]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#141E5A !important`,
          },
        }}
      >
        <DataGrid
          rows={material}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
 export default MaterialList;