import React from "react";
import { Box, Grid, Typography, TextField } from "@mui/material";

const BookingDetails = ({ booking }) => {
    console.log(booking)

  return (
    <Box>
      <Typography variant="h6">Booking Details</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Machine Purchased By User" value={booking.machinePurchasedByUser.toString()} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Installer" value={booking.installer} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Service" value={booking.service} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Start Time" value={booking.time_start} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="End Time" value={booking.time_end} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Date" value={booking.date} fullWidth disabled sx={{ mb: 1 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Payment Status" value={booking.paymentStatus} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Completion Status" value={booking.completionStatus.toString()} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Labour Rates" value={booking.labourRates} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Material Cost" value={booking.materialCost} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Customer Showing Cost" value={booking.customerShowingCost} fullWidth disabled sx={{ mb: 1 }} />
          <TextField label="Number of Installs" value={booking.number_of_installs} fullWidth disabled sx={{ mb: 1 }} />
        </Grid>
      </Grid>
      <Typography sx={{ mt: 2 }}>Material Details:</Typography>
      {booking.material_details.map((material, index) => (
        <Box key={index} ml={2} sx={{ mt: 1 }}>
          <TextField label="Material ID" value={material} fullWidth disabled sx={{ mb: 1 }} />
          {/* <TextField label="Number of Materials" value={material.number_of_materials} fullWidth disabled sx={{ mb: 1 }} /> */}
        </Box>
      ))}
      {booking.charger_details.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography >Charger Details:</Typography>
          {booking.charger_details.map((charger, index) => (
            <Box key={index} ml={2} sx={{ mt: 1 }}>
  <Typography sx={{ mb: 2 }}>Charger {index + 1}:</Typography>
  <TextField label="Model" value={charger.model} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Type" value={charger.type} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Charger Received By" value={charger.Charger_received_by} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Existing Outlet" value={charger.existing_outlet} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Upgraded to NEMA" value={charger.upgraded_to_nema.toString()} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Charger Location" value={charger.charger_location} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Attached Home" value={charger.attached_home.toString()} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Other Charger Detail 1" value={charger.other_detail_1} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Other Charger Detail 2" value={charger.other_detail_2} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Electrical Panel Location" value={charger.electrical_panel_location} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Floor" value={charger.floor} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Interior Wall Finish" value={charger.interior_wall_finish} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Exterior Wall Finish" value={charger.exterior_wall_finish} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Wall Construction" value={charger.wall_construction} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Electrical Panel Type" value={charger.electrical_panel_type} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Panel Brand" value={charger.panel_brand} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Main Breaker Size" value={charger.main_breaker_size} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Greater Equal" value={charger.gretater_equal} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Open Breakers" value={charger.open_breakers} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Recessed Panel" value={charger.recessed_panel} fullWidth disabled sx={{ mb: 1 }} />
  <TextField label="Distance Panel" value={charger.distance_panel} fullWidth disabled sx={{ mb: 1 }} />
</Box>

          ))}
        </Box>
      )}
    </Box>
  );
};

export default BookingDetails;
