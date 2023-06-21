
import { Box , Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { deleteServicePrice } from "../../data/ApiController.js";

// import { deleteMaterial, getMaterials } from "api/materials";




 const ServicePriceHelper = ({servicePrice,setServicePrice}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

   const handleDelete = async (id) => {
    
    await deleteServicePrice(id);
    setServicePrice(servicePrice.filter((st) => st.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "service_name", headerName: "Service", width: 200 },
    { field: "number_of_installs", headerName: "Number of Installs", width: 400 },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
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
            color: `${colors.grey[400]} !important`,
          },
        }}
      >
        <DataGrid
          rows={servicePrice}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
 export default ServicePriceHelper;