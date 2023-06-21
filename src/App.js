import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import InstallerList from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import InstallerForm from "./scenes/installer/InstallerForm";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import InstallerLabourRates from "./scenes/labourRates";
import MaterialTaxForm from "./scenes/materialTax";
import Material from "./scenes/material";
import Service from "./scenes/service";
import ServiceTime from "./scenes/service/ServiceTime";
import ServicePrice from "./scenes/service/servicePrice";
import CreateBookingForm from "./scenes/bookings";
import CustomerForm from "./scenes/customer";
import AdminForm from "./scenes/admin";
import LoginScreen from "./scenes/login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,setUserName] = useState('');

  const handleLogin = (isValid) => {
    if (isValid) {
      setIsLoggedIn(true);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn ? (
            <>
              <Sidebar isSidebar={isSidebar}  username={userName} isLoggedIn={isLoggedIn}  />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/installer" element={<InstallerList />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/jobs" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/installerForm" element={<InstallerForm />} />
                  <Route path="/labourRate" element={<InstallerLabourRates />} />
                  <Route path="/materialTax" element={<MaterialTaxForm />} />
                  <Route path="/material" element={<Material />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/serviceTime" element={<ServiceTime />} />
                  <Route path="/servicePrice" element={<ServicePrice />} />
                  <Route path="/bookingForm" element={<CreateBookingForm />} />
                  <Route path="/customerForm" element={<CustomerForm />} />
                  <Route path="/admin" element={<AdminForm />} />
                </Routes>
              </main>
            </>
          ) : (
            <LoginScreen onLogin={handleLogin} setUserName={setUserName} />
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
