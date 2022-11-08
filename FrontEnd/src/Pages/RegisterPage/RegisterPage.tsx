/* eslint-disable max-len */
import React from 'react';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Form from '../SingUpSignInFrom.tsx/Form';
import RegisterFormInputs from './RegisterInputContainer';
import { post } from '../../Plugins/http';

type RegisterFormInputValues = {
  email?: string,
  username?: string,
  passwordOne?: string,
  repeatPassword?: string,
};
const validationSchema = yup.object({
  email: yup.string()
    .required('Requiered'),
    username: yup.string()
    .required('Requiered'),
    passwordOne: yup.string()
    .required('Requiered'),
    repeatPassword: yup.string()
    .required('Requiered'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState(true);
  const [errorText, setErrorText] = React.useState('');
  const {
    values, touched, errors, isValid, dirty,
    handleChange, handleBlur, handleSubmit, resetForm,

        } = useFormik<RegisterFormInputValues>({
              initialValues: {
                    email: '',
                    passwordOne: '',
                    repeatPassword: '',
                    username: '',
                  },
                    onSubmit(formData) {
                     const sendRegisterData = async () => {
                        try {
                          const res = await post('registerUser', formData);
                          setErrorText(res.message);
                          resetForm();
                        if (!res.error) {
                          setErrorMsg(!errorMsg);
                          setTimeout(() => {
                            navigate('/LoginPage');
                          }, 1000);
                        }
                        } catch (err) {
                          console.log(err);
                        }
                      };
                      sendRegisterData();
                  },
                  validationSchema,
                  });

                  const getToLoginPage = () => {
                    navigate('/LoginPage');
                  };
  return (

    <Form
      formName="Register"
      onRegistration="Registration successful!"
      buttonText="Register"
      className="RegisterPageBG"
      handleSubmit={handleSubmit}
      isValid={dirty && isValid}
      successMsg={errorMsg}
    >
      <HowToRegIcon sx={{ fontSize: 50, alignSelf: 'center' }} color="primary" />
      <RegisterFormInputs
        email={values.email}
        passwordOne={values.passwordOne}
        repeatPassword={values.repeatPassword}
        username={values.username}
        onEmailChange={handleChange}
        onUserNameChange={handleChange}
        onPasswordChange={handleChange}
        onRepeatPasswordChange={handleChange}
        onEmailError={touched.email && (Boolean(errors.email))}
        onUserNameError={touched.username && Boolean(errors.username)}
        onPasswordError={touched.passwordOne && Boolean(errors.passwordOne)}
        onRepeatPasswordError={touched.repeatPassword && Boolean(errors.repeatPassword)}
        emailHelperText={touched.email && errors.email}
        userNameHelperText={touched.username && errors.username}
        passwordHelperText={touched.passwordOne && errors.passwordOne}
        repeatPasswordHelperText={touched.repeatPassword && errors.repeatPassword}
        onBlur={handleBlur}
      />
      {dirty ? '' : <Typography sx={{ color: 'red' }} variant="h6">{errorText}</Typography>}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Already have an account?</Typography>
        <Button onClick={getToLoginPage}>Log In</Button>
      </Box>
    </Form>
    );
};

export default RegisterPage;
