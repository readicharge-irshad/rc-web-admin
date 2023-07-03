import React from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import StripeCheckoutButton from '../../components/StripeButton';

const CostDetails = ({ laborCost, customerCost, materialCost, bookingId }) => {
  return (
    <Box>
      <Typography variant="h4" my={2}>
        Cost Details
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Labor Cost"
            value={`$${laborCost}`}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Customer Cost"
            value={`$${customerCost}`}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Material Cost"
            value={`$${materialCost}`}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>
      <StripeCheckoutButton price={customerCost} bookingId={bookingId} />
    </Box>
  );
};

export default CostDetails;
