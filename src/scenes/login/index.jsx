
import React, { useState } from 'react'; 
import { Box, TextField, Button, Typography, Container } from '@mui/material'; 
import { validateAdmin } from '../../data/ApiController.js'; 
import { useNavigate } from 'react-router-dom'; 
 
const LoginScreen = ({ onLogin, setUserName , setRoles}) => { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
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
      setUserName(email); 
      console.log(response.data.roles)
      setRoles(response.data.roles)
      // navigate('/dashboard'); // Redirect to the dashboard upon successful login 
    } else { 
      setError('Invalid email or password'); 
    } 
  }; 
 
  return ( 
    <div style={{ backgroundColor: '#171f58', minHeight: '100vh',minWidth:'100vw' , display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
      <Container maxWidth="xs"> 
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '15px', 
            borderRadius: '12px', 
            backgroundColor: 'rgba(0, 0, 0, 0.1)', 
            backdropFilter: 'blur(8px)', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          }} 
        > 
          <Typography variant="h4" component="h1" gutterBottom style={{ color: '#fff' }}> 
            Readicharge 
          </Typography> 
          <Box component="form" noValidate sx={{ mt: 1 }}> 
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
              InputProps={{ 
                style: { color: '#fff' }, 
              }} 
              InputLabelProps={{ 
                style: { color: '#fff' }, 
              }} 
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
              InputProps={{ 
                style: { color: '#fff' }, 
              }} 
              InputLabelProps={{ 
                style: { color: '#fff' }, 
              }} 
            /> 
            {error && ( 
              <Typography variant="body1" color="error" gutterBottom> 
                {error} 
              </Typography> 
            )} 
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ 
                mt: 3, 
                mb: 2, 
                backgroundColor: 'rgba(148, 208, 52, 0.8)', 
                color: '#fff', 
                backdropFilter: 'blur(4px)', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
              }} 
              onClick={handleLogin} 
            > 
              Sign In 
            </Button> 
          </Box> 
        </Box> 
      </Container> 
    </div> 
  ); 
}; 
 
export default LoginScreen;