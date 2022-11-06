import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Toolbar,
    Box,
    AppBar,
    styled,
  } from '@mui/material';

const Link = styled(NavLink)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    padding: theme.spacing(0, 2),
    color: theme.palette.grey[200],
    textDecoration: 'none',

    ':hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.grey[50],
    },

    '&.active': {
      boxShadow: `inset 0 -4px 0 ${theme.palette.common.white}`,
    },
  }));
const Header = () => (
  <AppBar position="static">
    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
      <Box sx={{ display: 'flex' }}>
        <Link to="/" end>Home</Link>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Link to="/LoginPage">Login</Link>
        <Link to="/RegisterPage">Register</Link>
      </Box>
    </Toolbar>
  </AppBar>
  );

export default Header;
