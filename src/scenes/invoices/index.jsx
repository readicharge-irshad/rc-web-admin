import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import {
  getBookingsList,
  getServiceNameById,
  deleteBooking,
  updateBooking,
} from "../../data/ApiController.js";

const BookingTable = () => {
  const [bookingList, setBookingList] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const callDataObject = await getBookingsList();
      const tempData = [];
      for (const index in callDataObject.data) {
        const dataObject = callDataObject.data[index];
        console.log(dataObject)
        const serviceName = await getServiceNameById(dataObject.service);
        const materials = [];
        for (const i in dataObject.material_details) {
          materials.push(dataObject.material_details[i]);
          console.log(dataObject.material_details[i]);
        }

        const dataToBePushed = {
          id: `${dataObject._id}`,
          shown_id: `RC-TOK-${dataObject._id}`,
          date: dataObject.date,
          time_start: dataObject.time_start,
          time_end: dataObject.time_end,
          number_of_installs: dataObject.number_of_installs,
          materialCost: dataObject.materialCost,
          materialTax: dataObject.materialTax,
          material_details: materials,
          customerShowingCost: dataObject.customerShowingCost,
          paymentStatus: dataObject.paymentStatus,
          completionStatus: dataObject.completionStatus,
          installer: `${dataObject.installer}`,
          shown_installer: `RC-I-${dataObject.installer}`,
          service: serviceName,
          service_id: dataObject.service,
          machinePurchasedByUser: dataObject.machinePurchasedByUser,
          labourRates: dataObject.labourRates,
          changedBy:dataObject.changedBy
        };
        tempData.push(dataToBePushed);
      }
      setBookingList(tempData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `This field with ID ${id} will be permanently deleted. Are you sure?`
    );
    if (confirmDelete) {
      await deleteBooking(id);
      fetchData(); // Refresh the bookings list after deletion
    }
  };

  const handleRowUpdate = async (params) => {
    const { id, field, value } = params;
    const updatedRow = {
      ...params.row,
      [field]: value,
    };
  
    try {
      await updateBooking(id, updatedRow);
      const updatedBookingList = bookingList.map((booking) =>
        booking.id === id ? updatedRow : booking
      );
      setBookingList([...updatedBookingList]);
    } catch (error) {
      console.log(error);
    }
  };
  

  const columns = [
    { field: "shown_id", headerName: "ID", width: 100 },
    { field: "date", headerName: "Date", width: 200, editable: true },
    { field: "time_start", headerName: "Start Time", width: 150, editable: true },
    { field: "time_end", headerName: "End Time", width: 150, editable: true },
    { field: "number_of_installs", headerName: "Number of Installs", width: 200 },
    { field: "materialCost", headerName: "Material Cost", width: 200 },
    { field: "material_details", headerName: "Material Details", width: 400 },
    { field: "customerShowingCost", headerName: "Customer Showing Cost", width: 250 },
    { field: "paymentStatus", headerName: "Payment Status", width: 200 },
    { field: "completionStatus", headerName: "Completion Status", width: 200 },
    { field: "shown_installer", headerName: "Installer", width: 200 },
    { field: "service", headerName: "Service", width: 200 },
    { field: "machinePurchasedByUser", headerName: "Machine Purchased By User", width: 250 },
    { field: "labourRates", headerName: "Labour Rates", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "16px" }}
            color="primary"
            onClick={() => handleRowUpdate(params)}
          >
            Update
          </Button>
        </Box>
      ),
    },
    { field: "changedBy",headerName: "Changed By",width:400},
    
    
  ];

  return (
    <Box m="20px">
      <Header title="Tickets List" subtitle="Managing the Bookings on the platform" />
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
          editMode="row"
          onEditCellChange={handleRowUpdate}
          // Add other DataGrid props as needed
        />
      </Box>
    </Box>
  );
};

export default BookingTable;
