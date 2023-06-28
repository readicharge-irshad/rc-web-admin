import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Box, TextField, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getInstallerList, deleteInstaller, updateInstaller, getServiceNameById, createInstaller } from "../../data/ApiController.js";
import InstallerServicesPieChart from "../../components/PieChart";
import GeographyChart_02 from "../../components/Geographychart_02";


const formatDate = (date) => {
  if (!date) {
    return ''; // Return an empty string for null values
  }
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const handleUpdate = async (id, row) => {
  console.log(row)
  const response = await updateInstaller(id, row);
  if(response.status===200) alert("done")
  getInstallerList(); // Refresh the installer list after update
};



const createInstallersFromCSV = async (installerData) => {
  for (let i = 0; i < installerData.length; i++) {
    const dataObject = installerData[i];
    const fields1 = [
      'user_id', 'firstName', 'lastName', 'companyName', 'email', 'password',
      'phoneNumber', 'yearsOfExperience', 'description', 'addressLine1',
      'addressLine2', 'city', 'zip', 'miles_distance', 'state'
    ];
    const formData1 = fields1.reduce((acc, field) => {
      acc[field] = dataObject[field];
      return acc;
    }, {});

    const fields2 = [
      'licenseNumber', 'licenseExpirationDate', 'businessInsuranceCompany',
      'businessInsuranceNumber', 'businessAgentPhoneNumber', 'businessPolicyNumber',
      'businessInsuranceEffectiveStartDate', 'businessInsuranceEffectiveEndDate',
      'bondingCertificationNumber', 'bondingCompany', 'bondingAgentPhoneNumber',
      'bondAmount', 'bondingEffectiveStartDate', 'bondingEffectiveEndDate'
    ];
    const formData2 = fields2.reduce((acc, field) => {
      acc[field] = dataObject[field];
      return acc;
    }, {});

    const selectedServiceIds = dataObject.services.map((service) => service._id);
    const newInstaller = { ...formData1, ...formData2, "services": selectedServiceIds };
    await createInstaller(newInstaller);
  }
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
  const [selectedInstaller, setSelectedInstaller] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    var temp_data = [];
    for (let i = 0; i < installerData.data.length; i++) {
      const dataObject = installerData.data[i];

      let data_to_be_pushed = {
        id: dataObject._id,
        shown_id: `RC-I-${dataObject._id}`,
        firstName: dataObject.firstName,
        lastName: dataObject.lastName,
        companyName: dataObject.companyName,
        email: dataObject.email,
        password: dataObject.password,
        phoneNumber: dataObject.phoneNumber,
        yearsOfExperience: dataObject.yearsOfExperience,
        description: dataObject.description,
        addressLine1: dataObject.addressLine1,
        addressLine2: dataObject.addressLine2,
        city: dataObject.city,
        zip: dataObject.zip,
        miles_distance: dataObject.miles_distance,
        state: dataObject.state,
        licenseNumber: dataObject.licenseNumber,
        licenseExpirationDate: dataObject.licenseExpirationDate,
        businessInsuranceCompany: dataObject.businessInsuranceCompany,
        businessInsuranceNumber: dataObject.businessInsuranceNumber,
        businessAgentPhoneNumber: dataObject.businessAgentPhoneNumber,
        businessPolicyNumber: dataObject.businessPolicyNumber,
        businessInsuranceEffectiveStartDate: dataObject.businessInsuranceEffectiveStartDate,
        businessInsuranceEffectiveEndDate: dataObject.businessInsuranceEffectiveEndDate,
        bondingCertificationNumber: dataObject.bondingCertificationNumber,
        bondingCompany: dataObject.bondingCompany,
        bondingAgentPhoneNumber: dataObject.bondingAgentPhoneNumber,
        bondAmount: dataObject.bondAmount,
        bondingEffectiveStartDate: dataObject.bondingEffectiveStartDate,
        bondingEffectiveEndDate: dataObject.bondingEffectiveEndDate,
        services: dataObject.services,
        changedBy:dataObject.changedBy
      };

      temp_data.push(data_to_be_pushed);
    }
    setGetInstallerList(temp_data);
  };

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
  

  const handleOpenModal = (installer) => {
    console.log(installer)
    setSelectedInstaller(installer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInstaller(null);
    setIsModalOpen(false);
  };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    { field: "shown_id", headerName: "ID" },
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
       // Make this cell editable
    },
    {
      field: "zip",
      headerName: "Zip Code",
      flex: 1,
       // Make this cell editable
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
      width: 350,

      renderCell: (params) => (
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
          <Button
            variant="contained"
            style={{ marginLeft: "16px" }}
            color="primary"
            onClick={() => handleOpenModal(params.row)}
          >
            Edit Details
          </Button>
        </Box>
      ),

    },
    {
      field: "changedBy",
      headerName: "Change Log",
      flex: 1,
     
      // Make this cell editable
    },
  ];

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `This field with ID ${id} will be permanently deleted. Are you sure?`
    );
    if (confirmDelete) {
      await deleteInstaller(id);
      fetchInstallerList(); // Refresh the bookings list after deletion
    }
  };



  const handleImportCSV = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Send the CSV file to the createInstaller function for each row
    try {
      const response = await createInstallersFromCSV();
      if (response) getInstallerList();
      else {
        console.error("Failed to import CSV file");
      }
    } catch (error) {
      console.error("Error occurred while importing CSV file:", error);
    }
  };

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
            "& .MuiDataGrid-iconSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cellEditable": {
              backgroundColor: colors.greenAccent[200],
            },
          }}
        >
          <Box m="20px">
            <input
              accept=".csv"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImportCSV}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Import CSV
              </Button>
            </label>
          </Box>
          <DataGrid
            rows={getInstaller}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />
          <InstallerDetailsModal selectedInstaller={selectedInstaller} handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} handleUpdate={handleUpdate} />
        </Box>
      </Box>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: "90px" }}>
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

    </div>
  );
};

export default InstallerList;






// Modal Component 

const InstallerDetailsModal = ({
  selectedInstaller,
  handleCloseModal,
  isModalOpen,
  handleUpdate,
}) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (selectedInstaller) {
      setFormData(selectedInstaller);
    }
  }, [selectedInstaller]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (!formData) {
    return null; // You can render a loading spinner or placeholder while waiting for selectedInstaller data
  }

  return (


<Dialog open={isModalOpen} onClose={handleCloseModal}>
  <DialogTitle>Installer Details</DialogTitle>
  <DialogContent>
    <Box>
      <TextField
        name="shown_id"
        label="User ID"
        value={formData.shown_id || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="firstName"
        label="First Name"
        value={formData.firstName || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={formData.lastName || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="companyName"
        label="Company Name"
        value={formData.companyName || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={formData.password || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        value={formData.phoneNumber || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="yearsOfExperience"
        label="Years of Experience"
        type="number"
        value={formData.yearsOfExperience || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        name="addressLine1"
        label="Address Line 1"
        value={formData.addressLine1 || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="addressLine2"
        label="Address Line 2"
        value={formData.addressLine2 || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="city"
        label="City"
        value={formData.city || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="zip"
        label="ZIP"
        value={formData.zip || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="miles_distance"
        label="Miles Distance"
        type="number"
        value={formData.miles_distance || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="state"
        label="State"
        value={formData.state || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="licenseNumber"
        label="License Number"
        value={formData.licenseNumber || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="licenseExpirationDate"
        label="License Expiration Date"
        type="date"
        value={formatDate(formData.licenseExpirationDate) || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="businessInsuranceCompany"
        label="Business Insurance Company"
        value={formData.businessInsuranceCompany || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="businessInsuranceNumber"
        label="Business Insurance Number"
        value={formData.businessInsuranceNumber || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="businessAgentPhoneNumber"
        label="Business Agent Phone Number"
        value={formData.businessAgentPhoneNumber || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="businessPolicyNumber"
        label="Business Policy Number"
        value={formData.businessPolicyNumber || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="businessInsuranceEffectiveStartDate"
        label="Business Insurance Effective Start Date"
        type="date"
        value={formatDate(formData.businessInsuranceEffectiveStartDate) || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="businessInsuranceEffectiveEndDate"
        label="Business Insurance Effective End Date"
        type="date"
        value={formatDate(formData.businessInsuranceEffectiveEndDate) || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="bondingCertificationNumber"
        label="Bonding Certification Number"
        value={formData.bondingCertificationNumber || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="bondingCompany"
        label="Bonding Company"
        value={formData.bondingCompany || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="bondingAgentPhoneNumber"
        label="Bonding Agent Phone Number"
        value={formData.bondingAgentPhoneNumber || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="bondAmount"
        label="Bond Amount"
        type="number"
        value={formData.bondAmount || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="bondingEffectiveStartDate"
        label="Bonding Effective Start Date"
        type="date"
        value={formData.bondingEffectiveStartDate || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="bondingEffectiveEndDate"
        label="Bonding Effective End Date"
        type="date"
        value={formData.bondingEffectiveEndDate || ""}
        onChange={handleFieldChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal}>Close</Button>
    <Button onClick={() => handleUpdate(selectedInstaller.id, formData)}>
      Update and Save
    </Button>
  </DialogActions>
</Dialog>


  );
};

