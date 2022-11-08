/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import 'chart.js/auto';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import InputContainer from './inputs/inputContainer';

import AuthForm from './TaxCalcForm';
import BarChart from './ChartData/BarChart';
import PieChart from './ChartData/PieChart';
// import calcultateTaxes from './TaxCalculations/ChartData/CalculateTaxes';

type TaxCalculatorValues = {
  incomeValue: string,
  rentValue: string,
  taxesValue: string,
};
const validationSchema = yup.object({
  incomeValue: yup.number()
    .required('Requiered'),
  rentValue: yup.number()
    .required('Requiered'),
  taxesValue: yup.number()
    .required('Requiered'),
});
const TaxApp = () => {
  const [valid, setValid] = React.useState(false);
  const [barChart, setBarChart] = React.useState(false);
  const [pieChart, setPieChart] = React.useState(true);
  const [clicked, setClicked] = React.useState(false);
  const displayBarChart = () => {
    setBarChart(!barChart);
    setPieChart(!pieChart);
  };

  const {
    values, touched, errors, handleBlur,
    handleChange, handleSubmit,
  } = useFormik<TaxCalculatorValues>({
    initialValues: {
      incomeValue: '',
      rentValue: '',
      taxesValue: '',
    },

    onSubmit() {
      setValid(!valid);
      if (valid) {
        values.incomeValue = '';
        values.rentValue = '';
        values.taxesValue = '';
      }
    },
    validationSchema,
  });

    return (
      <Box
        className="IncomeCalculatorImage"
        sx={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}
      >
        <AuthForm
          setClicked={setClicked}
          clicked={clicked}
          title="Tax Calculator"
          submitText={!valid ? 'Calculate' : 'Clear'}
          onSubmit={handleSubmit}
          className={!valid ? 'UnsubmitedForm' : 'SubmitedForm'}
        >

          <Box
            className={!valid ? 'mainContainer' : 'bothParts'}
          >
            <Box sx={{
            display: !clicked ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
            >
              {valid && pieChart
            && (
            <Box className="dataDisplay">
              <PieChart
                incomeValue={values.incomeValue}
                rentValue={values.rentValue}
                taxesValue={values.taxesValue}
              />
              <Button variant="outlined" onClick={displayBarChart}>{barChart ? 'Pie Chart' : 'Bar Chart'}</Button>
            </Box>
            )}
              { barChart && (
              <Box sx={{ width: '600px', pr: '50px' }}>
                <BarChart
                  incomeValue={values.incomeValue}
                  rentValue={values.rentValue}
                  taxesValue={values.taxesValue}
                />
                <Button variant="outlined" onClick={displayBarChart}>{barChart ? 'Pie Chart' : 'Bar Chart'}</Button>
              </Box>
)}

            </Box>

            <InputContainer
              className={valid ? 'dataInput' : 'dataInputError'}
              incomeValue={values.incomeValue}
              rentValue={values.rentValue}
              taxesValue={values.taxesValue}
              onIncomeChange={handleChange}
              onRentChange={handleChange}
              onTaxesChange={handleChange}
              onError={touched.incomeValue && touched.rentValue && touched.taxesValue && Boolean(errors.incomeValue)}
              helperText={touched.incomeValue && errors.incomeValue}
              onBlur={handleBlur}
            />
          </Box>
        </AuthForm>
      </Box>
  );
};

export default TaxApp;
