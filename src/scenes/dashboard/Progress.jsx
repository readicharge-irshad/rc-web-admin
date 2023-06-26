import React from "react";
import { Box, Typography, Button } from "@mui/material";

const UnderProgress = ({ handleLogout }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" color="error" mb={2}>
       Still Under Construction !! We Will make it live with the development flow
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        You can check and use other pages or can simply logout !!!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default UnderProgress;
