import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState ,useEffect} from "react";
import { getBookingsList,getServiceNameById,deleteBooking,updateBooking } from "../../data/ApiController.js";

const BookingTable = ({  }) => {
  const [bookingList,setBookingList] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect( () => {
       FetchData();
  }, [])
  
  const FetchData = async () => {
    try {   
        const callDataObject = await getBookingsList();
        const tempData=[]
        for (const index in callDataObject.data) {
        const dataObject = callDataObject.data[index]
        const serviceName = await getServiceNameById(dataObject.service);
     
        const dataToBePushed = {
          id: dataObject._id,
          date: dataObject.date,
          time_start: dataObject.time_start,
          time_end: dataObject.time_end,
          number_of_installs: dataObject.number_of_installs,
          materialCost: dataObject.materialCost,
          materialTax: dataObject.materialTax,
          material_details: dataObject.material_details,
          customerShowingCost: dataObject.customerShowingCost,
          paymentStatus: dataObject.paymentStatus,
          completionStatus: dataObject.completionStatus,
          installer: dataObject.installer,
          service: serviceName,
          service_id:dataObject.service,
          machinePurchasedByUser: dataObject.machinePurchasedByUser,
          labourRates: dataObject.labourRates,
        };
        tempData.push(dataToBePushed)}
      setBookingList(tempData);

    } catch (error) {
      console.log(error);
    }
  };
  



  const handleDelete = async (id) => {
    await deleteBooking(id);
    FetchData(); // Refresh the bookings list after deletion
  };

  const handleUpdate = async (id,row) => {
    await updateBooking(id,row);
    FetchData(); // Refresh the bookings list after update
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "date", headerName: "Date", width: 200, editable: true },
    { field: "time_start", headerName: "Start Time", width: 150, editable: true },
    { field: "time_end", headerName: "End Time", width: 150, editable: true },
    { field: "number_of_installs", headerName: "Number of Installs", width: 200, editable: true },
    { field: "materialCost", headerName: "Material Cost", width: 200, editable: true },
    { field: "materialTax", headerName: "Material Tax", width: 200, editable: true },
    { field: "material_details", headerName: "Material Details", width: 400 },
    { field: "customerShowingCost", headerName: "Customer Showing Cost", width: 250, editable: true },
    { field: "paymentStatus", headerName: "Payment Status", width: 200 },
    { field: "completionStatus", headerName: "Completion Status", width: 200 },
    { field: "installer", headerName: "Installer", width: 200 },
    { field: "service", headerName: "Service", width: 200 },
    { field: "machinePurchasedByUser", headerName: "Machine Purchased By User", width: 250 },
    { field: "labourRates", headerName: "Labour Rates", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
          <Button variant="contained" style={{marginLeft:"16px"}} color="primary" onClick={() => handleUpdate(params.row.id , params.row)}>
            Update
          </Button>
        </Box>
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
          rows={bookingList}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          editMode="cell"
          onEditCellChange={(params) => {
            if (
              params.field === "date" ||
              params.field === "time_start" ||
              params.field === "time_end" ||
              params.field === "number_of_installs" ||
              params.field === "materialCost" ||
              params.field === "materialTax" ||
              params.field === "customerShowingCost"
            ) {
              const updatedRow = {
                ...params.row,
                [params.field]: params.value,
              };
              handleUpdate(updatedRow);
            }
          }}
          // Add other DataGrid props as needed
        />
      </Box>
    </Box>
  );
};

export default BookingTable;
