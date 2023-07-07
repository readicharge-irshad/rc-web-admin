import React, { useState, useEffect } from "react";
import { Box, Button ,Dialog, DialogTitle, DialogContent, Typography} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { getBookingsList, getServiceNameById,getInstallerNameById,getMaterialNameById, deleteBooking, updateBooking } from "../../data/ApiController.js";
import BookingDetails from "./BookingDetails";

const BookingTable = ({admin}) => {
  const [bookingList, setBookingList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const getCountBasedPadStart = (count) => {
  if (count < 10) {
    return 5;
  } else if (count < 100) {
    return 4;
  } else if (count < 1000) {
    return 3;
  } else if (count < 10000) {
    return 2;
  }
  else {
    // add more conditions as needed
    return 1; // fallback value
  }
};

  const fetchData = async () => {
    try {
      const callDataObject = await getBookingsList();
      const tempData = [];
      var i = 0 ;
      for (const dataObject of callDataObject.data) {
        const serviceName = await getServiceNameById(dataObject.service);
        const installerName = await getInstallerNameById(dataObject.installer)
        const materials = dataObject.material_details.map(async (material) => await getMaterialNameById(material.material_id));
        
         const count = i + 1;
         const padStartCount = getCountBasedPadStart(count);
         i++;

        
        const dataToBePushed = {
          id: dataObject._id,
          shown_id: `RC-TOK-${count.toString().padStart(padStartCount, "0")}`,
          date: dataObject.date,
          time_start: dataObject.time_start,
          time_end: dataObject.time_end,
          number_of_installs: dataObject.number_of_installs,
          materialCost: dataObject.materialCost,
          material_details: materials,
          charger_details:dataObject.charger_details,
          customerShowingCost: dataObject.customerShowingCost,
          paymentStatus: dataObject.paymentStatus,
          completionStatus: dataObject.completionStatus,
          installer: dataObject.installer,
          shown_installer:installerName,
          service: serviceName,
          service_id: dataObject.service,
          machinePurchasedByUser: dataObject.machinePurchasedByUser,
          labourRates: dataObject.labourRates,
          changedBy: dataObject.changedBy
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
  
  try {
    const updatedRow = {
      ...params.row,
      [field]: value,
      changedBy:admin
    };
    
    await updateBooking(id, updatedRow);
    
    setBookingList((prevBookingList) => {
      const updatedBookingList = prevBookingList.map((booking) =>
        booking.id === id ? updatedRow : booking
      );
      return updatedBookingList;
    });
  } catch (error) {
    console.log(error);
  }
};


  const columns = [
    { field: "shown_id", headerName: "ID", width: 100 },
    { field: "date", headerName: "Date", width: 200, editable: true },
    { field: "number_of_installs", headerName: "Number of Installs", width: 200 },
    { field: "materialCost", headerName: "Material Cost", width: 200 },
    { field: "customerShowingCost", headerName: "Customer Showing Cost", width: 250 },
    { field: "paymentStatus", headerName: "Payment Status", width: 200 },
    { field: "completionStatus", headerName: "Completion Status", width: 200 },
    { field: "shown_installer", headerName: "Installer", width: 200 },
    { field: "service", headerName: "Service", width: 200 },
    { field: "labourRates", headerName: "Labour Rates", width: 200 },
    
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
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
          <Button
        variant="contained"
        style={{ marginLeft: "16px" }}
        color="primary"
        onClick={() => handleOpenModal(params.row)}
      >
        View Details
      </Button>
        </Box>
      ),
    },
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
        }}
      >
        <DataGrid
          rows={bookingList}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          editMode="row"
          
        />
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box>
              <BookingDetails booking={selectedBooking} />
              {/* Add other booking details here */}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BookingTable;
