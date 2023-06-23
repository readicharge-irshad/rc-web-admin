import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { getInstallerList, deleteInstaller, updateInstaller, getServiceNameById } from "../../data/ApiController.js";
import InstallerServicesPieChart from "../../components/PieChart";
import GeographyChart_02 from "../../components/Geographychart_02";


const handleDelete = async (id) => {
  await deleteInstaller(id);
  getInstallerList(); // Refresh the installer list after deletion
};

const handleUpdate = async (id, row) => {
  await updateInstaller(id, row);
  getInstallerList(); // Refresh the installer list after update
};

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];


const InstallerList = () => {
  const [getInstaller, setGetInstallerList] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [formState, setFormState] = useState(
    states.map((state) => ({ state, count: 0 }))
  );
  const fetchInstallerList = async () => {

    const installerData = await getInstallerList();
    console.log(installerData.data);

    // for the Geo map this section of code is being used 
    if (installerData.data.length > 0) {
      const updatedFormState = formState.map((formStateItem) => {
        const correspondingItems = installerData.data.filter(
          (item) => item.state === formStateItem.state
        );
        console.log(formStateItem.state)
        const count = correspondingItems.length;
        return { state: formStateItem.state, count };
      });
      setFormState(updatedFormState);
    }
    var temp_data = []
    for (let i = 0; i < installerData.data.length; i++) {
      const dataObject = installerData.data[i];

      let data_to_be_pushed = {
        id: dataObject._id,
        firstName: dataObject.firstName,
        email: dataObject.email,
        state: dataObject.state,
        zip: dataObject.zip,
        Number_of_bookings: dataObject.Number_of_bookings,
        ratingsAndReviews: dataObject.ratingsAndReviews,
        services: dataObject.services
      }
      temp_data.push(data_to_be_pushed);

    }
    setGetInstallerList(temp_data)
  }
  useEffect(() => {
    fetchInstallerList();
  }, []);

  useEffect(() => {
    if (getInstaller.length > 0) {
      const services = {};
      getInstaller.forEach((installer) => {
        if (installer.services) {
          installer.services.forEach((serviceId) => {
            if (!services[serviceId]) {
              services[serviceId] = { count: 0 };
            }
          });
        }
      });
      getInstaller.forEach((installer) => {
        if (installer.services) {
          installer.services.forEach((serviceId) => {
            if (services[serviceId]) {
              services[serviceId].count++;
            }
          });
        }
      });
      
      const pieData = Object.keys(services).map((serviceId) => {
        return {
          id: serviceId,
          label: serviceId,
          value: services[serviceId].count,
        };
      });
      setPieData(pieData);
    }
  }, [getInstaller]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "Name",
      flex: 1,
      editable: true, // Make this cell editable
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true, // Make this cell editable
    },
    {
      field: "state",
      headerName: "State",
      headerAlign: "left",
      align: "left",
      editable: true, // Make this cell editable
    },
    {
      field: "zip",
      headerName: "Zip Code",
      flex: 1,
      editable: true, // Make this cell editable
    },
    {
      field: "Number_of_bookings",
      headerName: "Jobs Completed",
      flex: 1,
      editable: true, // Make this cell editable
    },
    {
      field: "ratingsAndReviews",
      headerName: "Rating",
      flex: 1,
      editable: true, // Make this cell editable
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
    }
  ];
  return (
    <div style={{ overflowY: 'auto', height: 'calc(100vh - 150px)' }}>
      <Box m="20px">
        <Header
          title="Installer List"
          subtitle="Managing the Installers on the platform"
          
        />
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
  rows={getInstaller}
  columns={columns}
  components={{ Toolbar: GridToolbar }}
  editMode="cell"
  onEditCellChange={(params) => {
    if (
      params.field === "firstName" ||
      params.field === "email" ||
      params.field === "state" ||
      params.field === "zip" ||
      params.field === "Number_of_bookings" ||
      params.field === "ratingsAndReviews"
    ) {
      const updatedRow = {
        ...params.row,
        [params.field]: params.value,
      };
      handleUpdate(updatedRow);
    }
  }}
/>
        </Box>
        <div style={{ display: 'flex', flexDirection: 'row'  ,marginTop:"20px"}}>
        <div style={{ flex: 1 }}>
          <Header
            title="Service Ratio"
            subtitle="Ratio of installers/Service"
          />
          <InstallerServicesPieChart pieData={pieData} />
        </div>
        <div style={{ flex: 1 }}>
          <Header
            title="Installers per State"
            subtitle="Installers List per state"
          />
          <GeographyChart_02 data={formState} />
        </div>
      </div>

      </Box>


    </div>
  );
};
export default InstallerList;
