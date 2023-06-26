import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { getAdminData, deleteAdmin, updateAdmin } from "../../data/ApiController.js";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const AdminList = () => {
  const [getAdmin, setGetAdmin] = useState([]);
  const fetchAdminList = async () => {
    const adminData = await getAdminData();
    var temp_data = [];
    for (let i = 0; i < adminData.data.length; i++) {
      const dataObject = adminData.data[i];
      let data_to_be_pushed = {
        id: dataObject._id,
        name: dataObject.name,
        email: dataObject.email,
        phoneNumber: dataObject.phoneNumber,
        address: dataObject.address,
      };
      temp_data.push(data_to_be_pushed);
    }
    setGetAdmin(temp_data);
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="secondary"
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
            rows={getAdmin}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            editMode="cell"
            onEditCellChange={(params) => {
              // ...handleEditCellChange logic
            }}
            renderCell={(params) => (
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
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
            )}
          />
        </Box>
      </Box>
    </div>
  );
};

export default AdminList;
