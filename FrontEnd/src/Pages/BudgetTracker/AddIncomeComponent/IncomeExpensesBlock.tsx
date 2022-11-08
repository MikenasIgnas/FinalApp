/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
import {
 Box, Paper, Typography,
} from '@mui/material';
import React from 'react';
import IncomeInput from './AddIncomeBtn/IncomeInput';

type IncomeExpensesBlockProps = {
  expenses: number,
  setIncome: (value:number) => void
  setBalance: (value:number) => void
  setExpenses: (value:number) => void
  income:number
  balance:number
  errorMsg:string
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,

};
const IncomeExpensesBlock = ({
 expenses,
 setIncome,
 income,
 balance,
 setBalance,
 errorMsg,
 setErrorMsg,
 setExpenses,
}:IncomeExpensesBlockProps) =>
   (
     <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
       <Paper sx={{ width: '250px', height: '100%' }}>
         <Typography variant="h6">Income</Typography>
         <Typography variant="h6">
           $
           {income}
           <Typography sx={{ color: 'red' }}>{errorMsg }</Typography>
         </Typography>
         <IncomeInput
           balance={balance}
           setExpenses={setExpenses}
           setIncome={setIncome}
           setBalance={setBalance}
           setErrorMsg={setErrorMsg}
         />
       </Paper>
       <Paper sx={{ width: '250px' }}>
         <Typography variant="h6">Expenses</Typography>
         <Typography variant="h6">
           $
           {expenses}
         </Typography>
       </Paper>
       <Paper sx={{ width: '250px' }}>
         <Typography variant="h6">Balance</Typography>
         <Typography sx={{ color: balance < 0 ? 'red' : 'black' }} variant="h6">
           $
           {balance}
         </Typography>
       </Paper>
     </Box>
    );
export default IncomeExpensesBlock;
