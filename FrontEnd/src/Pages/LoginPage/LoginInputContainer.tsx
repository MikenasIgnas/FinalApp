import { Box } from '@mui/material';
import React from 'react';
import InputComponent from '../TaxCalculator/inputs/InputComponent';

type InputContainerProps = {
    email:string | undefined
    password:string | undefined,
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onEmailError: boolean | undefined,
    onPasswordError: boolean | undefined,
    emailHelperText: string | false | undefined
    passwordHelperText: string | false | undefined
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
};
const LoginFormInputContainer:React.FC<InputContainerProps> = ({
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onEmailError,
    onPasswordError,
    emailHelperText,
    passwordHelperText,
    onBlur,
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box className="UnsubmitedForm">
      <InputComponent
        value={email}
        onChange={onEmailChange}
        helperText={emailHelperText}
        onBlur={onBlur}
        error={onEmailError}
        name="email"
        placeholder="Enter your Email"
        id="emailInput"
        label="Email"
        type="email"
      >
        Email
      </InputComponent>
      <InputComponent
        label="Password"
        value={password}
        name="password"
        placeholder="Enter your Tax password"
        id="passwordInput"
        onChange={onPasswordChange}
        error={onPasswordError}
        helperText={passwordHelperText}
        onBlur={onBlur}
        type="password"
      >
        Password
      </InputComponent>
    </Box>
  </Box>
  );

export default LoginFormInputContainer;
