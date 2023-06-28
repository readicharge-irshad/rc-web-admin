import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const fixed_username = 'Brian@readicharge.com';

const Item = ({ title, to, icon, selected, setSelected, isLoggedIn, username, enabled }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSectionEnabled = () => {
    if (!isLoggedIn) {
      return false;
    }
  
    if (username === fixed_username) {
      return true; // Enable all sections for the fixed username
    }
  
    
    const lowercaseTitle = title.toLowerCase();
    console.log(enabled.some((role) => lowercaseTitle.includes(role.toLowerCase())))
    // Enable the section if any role from the roles list is present in the lowercase title
    return enabled.some((role) => lowercaseTitle.includes(role.toLowerCase()));
  };
  

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[200],
        backgroundColor: selected === title ? "#94d034" : "inherit",
        marginLeft: "-25px",
        borderTopRightRadius: selected === title ? "23px" : 0,
        borderBottomRightRadius: selected === title ? "23px" : 0,
        pointerEvents: isSectionEnabled() ? "auto" : "none",
        opacity: isSectionEnabled() ? 1 : 0.5,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ username, isLoggedIn, enabledSections }) => {
  console.log(enabledSections)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  READICHARGE
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {username === fixed_username && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
              )}
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {username}
                </Typography>
                {username === fixed_username ? (
                  <Typography variant="h5" color={colors.grey[500]}>
                    Super Admin
                  </Typography>
                ) : (
                  <Typography variant="h5" color={colors.grey[500]}>
                    Sub Admin
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<ViewQuiltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Installers"
              to="/installer"
              icon={<PermIdentityOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Customers"
              to="/under-progress"
              icon={<PermIdentityOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Admins"
              to="admin-list"
              icon={<SupervisorAccountOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Companies"
              to="/under-progress"
              icon={<BusinessOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Job Tickets"
              to="/jobs"
              selected={selected}
              icon={<BusinessOutlinedIcon />}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Create New
            </Typography>
            <Item
              title="Installer"
              to="/installerForm"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Customer"
              to="/under-progress"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Job Ticket"
              to="/bookingForm"
              icon={<NoteAddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Admin Users"
              to="/admin"
              icon={<AdminPanelSettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Others
            </Typography>
            <Item
              title="Manage Services"
              to="/service"
              icon={<BorderColorOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Time Per Service"
              to="/serviceTime"
              icon={<AccessTimeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Service Price"
              to="/servicePrice"
              icon={<MonetizationOnOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Manage Materials"
              to="/material"
              icon={<PostAddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Manage Material Tax"
              to="/materialTax"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
            <Item
              title="Manage Labour Rates"
              to="/labourRate"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isLoggedIn={isLoggedIn}
              username={username}
              enabled={enabledSections}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
