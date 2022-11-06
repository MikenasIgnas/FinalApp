import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Toolbar,
    Box,
    AppBar,
    styled,
    Button,
  } from '@mui/material';
import { useAppDispatch } from '../../../store/hooks';
import { clearUserData } from '../../../auth/reducer';

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
const LogedInHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    dispatch(clearUserData());
    navigate('/');
  };
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
        <Box sx={{ display: 'flex' }}>
          <Link to="/LogedInPage" end>Home</Link>
          <Link to="/news" end>News</Link>
          <Link to="/BudgetTracker">Budget</Link>
          <Link to="/IncomeTracker">Calculate Income</Link>
          <Link to="/Stocks">Stocks</Link>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button sx={{ color: 'white' }} variant="outlined" onClick={logOut}>Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
    );
};

export default LogedInHeader;
