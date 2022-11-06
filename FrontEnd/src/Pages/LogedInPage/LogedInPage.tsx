import { Box, Typography, Paper } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
// import { get } from '../../Plugins/http';

// type UserData = {
//   _id:string,
//   password:string,
//   repeatPassword:string,
//   secret:string,
//   username:string
// };
const LogedInPage = () => {
  const username = useAppSelector((state) => state.username);
  return (
    <Box>

      <Box sx={{
          width: '100%',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '300px',
            height: '300px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5">
            Welcome
            {' '}
            {username}
          </Typography>
        </Paper>
      </Box>
      <Outlet />
    </Box>
      );
};

export default LogedInPage;
