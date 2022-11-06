import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import LogedInHeader from '../Components/ApplicationBar/LogedInHeader';

const AuthLayout: React.FC = () => (
  <Box sx={{
    placeItems: 'center',
    backgroundSize: 'cover',
  }}
  >
    <LogedInHeader />
    <Outlet />
  </Box>
);

export default AuthLayout;
