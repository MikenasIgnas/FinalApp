import {
    Button, Paper, Typography, Box,
  } from '@mui/material';
  import React from 'react';

  type FormProps = {
    children?: React.ReactNode
    formName:string
    buttonText:string
    className:string
    handleSubmit: (e:React.FormEvent<HTMLFormElement>)=> void
    isValid?: boolean,
    successMsg?:boolean
    onRegistration?:string,
  };

  const Form = ({
        children,
        formName,
        buttonText,
        className,
        handleSubmit,
        isValid = true,
        onRegistration,
        successMsg,
}:FormProps) => (
  <Box
    sx={{
                    width: '100%',
                    height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
    className={className}
  >
    <Box>
      <Paper
        component="form"
        sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'center',
                  padding: '10px',
                  alignItems: 'center',
                  width: '400px',
                }}
        elevation={10}
        onSubmit={handleSubmit}
      >
        <Typography component="h1" variant="h4" align="center">{formName}</Typography>
        { !successMsg
          && <Typography sx={{ color: 'lawngreen' }} component="h1" variant="h5" align="center">{onRegistration}</Typography>}
        <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
        >

          {children}

        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ height: 60 }}
          size="large"
          disabled={!isValid}
        >
          {buttonText}

        </Button>
      </Paper>
    </Box>
  </Box>
          );
export default Form;
