import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { validateAdmin } from '../../data/ApiController.js';
import { useNavigate } from 'react-router-dom';

const LoginScreen = ({ onLogin ,setUserName}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password
    };

    const response = await validateAdmin(formData);
    if (response.data.valid) {
      onLogin(true);
      setUserName(email)
    //   navigate('/dashboard'); // Redirect to the dashboard upon successful login
    } else {
        console.log(response)
      // Handle login error, display message or perform any necessary actions
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding:"15px",borderRadius:"12px" }} bgcolor=" #171f58" >
        <Typography variant="h4" component="h1" gutterBottom>
          Readicharge
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            bgcolor="#94d034"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
