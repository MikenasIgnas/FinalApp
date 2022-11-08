import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const getStarted = () => {
    navigate('/RegisterPage');
  };

  return (
    <Box sx={{
   width: '100%', height: '900px',
  }}>
      <Box
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
  }}
        className="HomePageBG"
      >
        <Box sx={{
        width: '90%',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '20px',
  }}
        >
          <Box sx={{
        width: '700px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        paddingLeft: '20px',
  }}
          >
            <Typography variant="h3">Welcome to FinTrack</Typography>
            <Typography variant="h5">Read news, track your finances, and budged your spending!</Typography>
            <Button onClick={getStarted} variant="contained">Get Started</Button>
          </Box>
        </Box>
      </Box>
    </Box>
    );
};

export default HomePage;
