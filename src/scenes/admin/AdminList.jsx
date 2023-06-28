import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, useTheme, Button, Checkbox } from "@mui/material";
import { getAdminData, deleteAdmin, updateAdmin } from "../../data/ApiController.js";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const AdminList = () => {
  const [getAdmin, setGetAdmin] = useState([]);
  const [editableFields, setEditableFields] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});

  const fetchAdminList = async () => {
    const adminData = await getAdminData();
    var temp_data = [];
    var tempEditableFields = [];
    var tempCheckboxStates = {};

    for (let i = 0; i < adminData.data.length; i++) {
      const dataObject = adminData.data[i];
      let roles = dataObject.roles || [];

      let data_to_be_pushed = {
        shown_id: `RC-ADM-${dataObject._id}`,
        id: dataObject._id,
        name: dataObject.name,
        email: dataObject.email,
        phoneNumber: dataObject.phoneNumber,
        address: dataObject.address,
        roles: roles,
      };

      temp_data.push(data_to_be_pushed);
      tempEditableFields.push(dataObject.email);
      tempCheckboxStates[dataObject.email] = roles.includes(dataObject.email);
    }

    setGetAdmin(temp_data);
    setEditableFields(tempEditableFields);
    setCheckboxStates(tempCheckboxStates);
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`This field with ID ${id} will be permanently deleted. Are you sure?`);
    if (confirmDelete) {
      await deleteAdmin(id);
      fetchAdminList(); // Refresh the admin list after deletion
    }
  };

  const handleUpdate = async (id, row) => {
    await updateAdmin(id, row);
    fetchAdminList(); // Refresh the admin list after update
  };

  const handleRoleCheckboxChange = async (adminId, role) => {
    const adminIndex = getAdmin.findIndex((admin) => admin.id === adminId);
    if (adminIndex !== -1) {
      const adminEmail = getAdmin[adminIndex].email;
      const updatedRolesCopy = [...getAdmin];
      const adminRoles = updatedRolesCopy[adminIndex].roles || [];
  
      if (adminRoles.includes(role)) {
        // Remove the role if already present
        const updatedRoles = adminRoles.filter((r) => r !== role);
        updatedRolesCopy[adminIndex].roles = updatedRoles;
      } else {
        // Add the role if not present
        updatedRolesCopy[adminIndex].roles = [...adminRoles, role];
      }
  
      setGetAdmin(updatedRolesCopy);
    }
  };
  
  const handleCellEditCommit = async ({ id, field, value }) => {
    const updatedAdmin = { ...getAdmin[id], [field]: value };
    await updateAdmin(id, updatedAdmin);
    
    fetchAdminList(); // Refresh the admin list after update
  };
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const roles = ['Installer', 'Customer', 'Service', 'Material', 'Payments'];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: false,
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      editable: true,
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: true,
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
    ...roles.map((role) => ({
      field: role,
      headerName: role,
      flex: 1,
      editable: (params) => params.row.email === "Brian@readicharge.com",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.roles.includes(params.field)}
          disabled={params.row.email === "Brian@readicharge.com"}
          onChange={() => handleRoleCheckboxChange(params.row.id, params.field)}
        />
      ),
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    })),
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) =>
        params.row.email === "Brian@readicharge.com" ? null : (
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
              onClick={() => handleUpdate(params.row.id, params.row)}
            >
              Update
            </Button>
          </Box>
        ),
      cellClassName: (params) =>
        params.row.email === "Brian@readicharge.com" ? "highlighted-row" : "",
    },
  ];

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 150px)" }}>
      <Box m="20px">
        <Header title="Admin List" subtitle="Managing the Admins on the platform" />
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
              color: colors.grey[400],
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
              color: colors.white,
            },
            "& .highlighted-row": {
              backgroundColor: "#94d034",
              fontWeight: "bold",
            },
          }}
        >
          <DataGrid
            rows={getAdmin}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            disableSelectionOnClick
            onCellEditCommit={handleCellEditCommit}
          />
        </Box>
      </Box>
    </div>
  );
};

export default AdminList;
