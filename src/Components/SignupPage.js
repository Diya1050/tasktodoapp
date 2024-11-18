
import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signup } from '../redux/userSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import myImage from '../assets/loginimage.jpg'; // Ensure correct path to your image
import myImage from '../assests/signup.webp'
const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    // Dispatch signup action with user data
    dispatch(signup({ email: data.email, password: data.password }));
    
    // Show success toast
    toast.success("Signup successful! Redirecting to login page...");

    // After 3 seconds, navigate to the login page
    setTimeout(() => {
      navigate('/login');
    }, 3000);  // Redirect after 3 seconds
  };

  return (
    <>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#F4F6F9',
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
              Sign Up
            </Typography>

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
                Sign Up
              </Button>
            </form>
          </Container>

          {/* Image Section */}
          <Box 
            sx={{
              display: { xs: 'none', md: 'block' },  // Hide on small screens
              width: '50%',
              height: '100%',
              backgroundColor: '#6200ea',
              position: 'relative',
            }}
          >
            <img 
              src={myImage} 
              alt="Signup Illustration" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',  // Ensure image covers container without distortion
                borderRadius: '8px',
              }} 
            />
          </Box>
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
    </>
  );
};

export default SignupPage;


