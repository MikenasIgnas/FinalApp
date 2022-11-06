import { Box } from '@mui/material';
import React from 'react';
import InputComponent from '../TaxCalculator/inputs/InputComponent';

type InputContainerProps = {
    email:string | undefined
    username:string | undefined,
    passwordOne:string | undefined,
    repeatPassword:string | undefined,
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onRepeatPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onEmailError: boolean | undefined,
    onUserNameError: boolean | undefined,
    onPasswordError: boolean | undefined,
    onRepeatPasswordError: boolean | undefined,
    onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    emailHelperText: string | false | undefined
    userNameHelperText: string | false | undefined
    passwordHelperText: string | false | undefined
    repeatPasswordHelperText: string | false | undefined
};
const RegisterFormInputs:React.FC<InputContainerProps> = ({
    email,
    username,
    passwordOne,
    repeatPassword,
    onEmailChange,
    onUserNameChange,
    onPasswordChange,
    onRepeatPasswordChange,
    onEmailError,
    onUserNameError,
    onPasswordError,
    onRepeatPasswordError,
    emailHelperText,
    userNameHelperText,
    passwordHelperText,
    repeatPasswordHelperText,
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
        label="User Name"
        value={username}
        name="username"
        placeholder="Enter your User Name"
        id="userNameInput"
        onChange={onUserNameChange}
        error={onUserNameError}
        helperText={userNameHelperText}
        onBlur={onBlur}
        type="text"
      >
        Username
      </InputComponent>
      <InputComponent
        label="Password"
        value={passwordOne}
        name="passwordOne"
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
      <InputComponent
        label="Repeat Password"
        value={repeatPassword}
        name="repeatPassword"
        placeholder="Repeat Password"
        id="repeatPasswordInput"
        onChange={onRepeatPasswordChange}
        error={onRepeatPasswordError}
        helperText={repeatPasswordHelperText}
        onBlur={onBlur}
        type="password"
      >
        Password
      </InputComponent>
    </Box>
  </Box>
  );

export default RegisterFormInputs;
