import React from "react";
import { Box, Typography, Button } from "@mui/material";

const NotAllowed = ({ handleLogout }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" color="error" mb={2}>
        Not Allowed
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        You are not authorized to access this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default NotAllowed;
