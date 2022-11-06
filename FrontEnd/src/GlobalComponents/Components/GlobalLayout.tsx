import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './ApplicationBar/Header';

const GlobalLayout: React.FC = () => (
  <Box>
    <Header />
    <Outlet />
  </Box>
);

export default GlobalLayout;
