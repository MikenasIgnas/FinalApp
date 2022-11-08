import * as React from 'react';
import {
  Paper,
  Typography,
  Button,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

type AuthFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  title: string,
  submitText: string,
  children: React.ReactNode,
  className:string
  setClicked: React.Dispatch<React.SetStateAction<boolean>>
  clicked: boolean
};

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  title,
  submitText,
  children,
  className,
  setClicked,
  clicked,
}) => {
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Paper
      sx={{ p: '20px' }}
      component="form"
      className={className}
      elevation={10}
      onSubmit={onSubmit}
    >
      <AccountBalanceWalletIcon sx={{ fontSize: 50, alignSelf: 'center' }} color="primary" />
      <Typography component="h1" variant="h4" align="center">{title}</Typography>
      {children}
      <Button
        type="submit"
        variant="contained"
        sx={{ height: 60 }}
        size="large"
        onClick={handleClick}
      >
        {submitText}
      </Button>
      <Typography>*Based on Lithuanian tax code</Typography>
    </Paper>
  );
};

export default AuthForm;
