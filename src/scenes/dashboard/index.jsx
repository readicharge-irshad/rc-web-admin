import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Header from "../../components/Header";
import { getCountInstaller ,getBookingCount} from "../../data/ApiController.js";
import { useEffect } from "react";
import { useState } from "react";
import StripePayments from "./PaymentList";

const Dashboard =  () => {
  const [totalInstaller,setTotalInstaller] = useState("");
  const [totalCount,setTotalCount] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async ()=>{
     const count  = await getCountInstaller();
     const booking = await getBookingCount();
    setTotalInstaller(count)
    setTotalCount(booking);
    }
    fetchData();
  }, [])
  

  // Sample data

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: "#96D232",
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor="#f0f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography variant="h2" fontWeight="bold" color="#96D232">
              {totalInstaller }
            </Typography>
            <Typography variant="h6" color={colors.grey[600]}>
              Total Installer
            </Typography>
          </Box>
          <PersonIcon sx={{ color: "#96D232", fontSize: "32px" }} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f0f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography variant="h2" fontWeight="bold" color="#96D232">
              {totalInstaller}
            </Typography>
            <Typography variant="h6" color={colors.grey[600]}>
              Active Installer
            </Typography>
          </Box>
          <PointOfSaleIcon sx={{ color: "#96D232", fontSize: "32px" }} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f0f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography variant="h2" fontWeight="bold" color="#96D232">
              {totalCount}
            </Typography>
            <Typography variant="h6" color={colors.grey[600]}>
              Today's Bookings
            </Typography>
          </Box>
          <BookOnlineIcon sx={{ color: "#96D232", fontSize: "32px" }} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f0f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography variant="h2" fontWeight="bold" color="#96D232">
              {totalCount}
            </Typography>
            <Typography variant="h6" color={colors.grey[600]}>
              Total Customers
            </Typography>
          </Box>
          <PersonAddIcon sx={{ color: "#96D232", fontSize: "32px" }} />
        </Box>

        {/* ROW 2 */}
        {/* ... */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor="#f0f0f0"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color="#96D232">
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: "#96D232" }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor="#f0f0f0"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid #96D232`}
            colors={colors.grey[100]}
            p="15px"
          >

            <StripePayments/>
          </Box>
          {/* {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))} */}
        </Box>

        {/* ROW 3 */}

      </Box>
    </Box>
  );
};

export default Dashboard;
