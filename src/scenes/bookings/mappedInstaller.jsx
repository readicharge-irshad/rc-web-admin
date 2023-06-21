import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
 const InstallerDetails = ({ data }) => {
  return (
    <Box >
      <Typography variant="h5" my="20px">Installer Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={2}>
          <TextField
            label="First Name"
            value={data.firstName || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            label="Last Name"
            value={data.lastName || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            label="Email"
            value={data.email || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            label="Phone Number"
            value={data.phoneNumber || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            label="Years of Experience"
            value={data.yearsOfExperience || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            label="Address Line 1"
            value={data.addressLine1 || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={3} sm={2}>
          <TextField
            label="City"
            value={data.city || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            label="State"
            value={data.state || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            label="Zip"
            value={data.zip || '-'}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

      </Grid>
    </Box>
  );
};
 export default InstallerDetails;