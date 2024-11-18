

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import myImage from '../assests/loginimage.jpg'; // Make sure the image path is correct

const LoginPage = () => {
  const [loginError, setLoginError] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    // Dispatch login action and check authentication
    dispatch(login({ email: data.email, password: data.password }));
    
    if (isAuthenticated) {
      // Show success toast and navigate to dashboard after 3 seconds
      toast.success("Login successful! Redirecting to your dashboard...");
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000); // Delay redirect by 3 seconds
    } else {
      setLoginError(true);  // Show error if login failed
      toast.error("Invalid credentials, please try again.");
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');  // Redirect to SignupPage
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F4F6F9',  // Light background color
        padding: 4,
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          boxShadow: 3,
          borderRadius: 4,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Form Section */}
        <Container maxWidth="xs" sx={{ padding: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            align="center" 
            sx={{ fontWeight: 600, color: '#333' }}
          >
            Login Here
          </Typography>

          {loginError && <Alert severity="error">Invalid credentials, please try again.</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: "Invalid email format"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                },
              }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ 
                borderRadius: 4, 
                fontWeight: 600, 
                padding: '12px 0',
                backgroundColor: '#6200ea', 
                '&:hover': { backgroundColor: '#3700b3' },
              }}
            >
              Log In
            </Button>
          </form>

          {/* Signup Button */}
          <Button 
            variant="text" 
            color="secondary" 
            fullWidth 
            onClick={handleSignupRedirect} 
            sx={{
              marginTop: 2,
              textTransform: 'none',
              fontWeight: 600,
              color: '#6200ea',
            }}
          >
            Don't have an account? Sign Up
          </Button>
        </Container>

        {/* Image Section */}
        <Box 
          sx={{
            display: { xs: 'none', md: 'block' }, // Hide on small screens
            width: '50%',
            height: '100%',
            backgroundColor: '#6200ea', // Background color to match theme
            position: 'relative',
          }}
        >
          <img 
            src={myImage} 
            alt="Login Illustration" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', // Ensure the image covers the whole container without distortion
              borderRadius: '8px',  // Optional: Add rounded corners
            }} 
          />
        </Box>
      </Box>

      {/* Toastify Container for showing notifications */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000}  // Toast stays visible for 3 seconds
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover 
      />
    </Box>
  );
};

export default LoginPage;
