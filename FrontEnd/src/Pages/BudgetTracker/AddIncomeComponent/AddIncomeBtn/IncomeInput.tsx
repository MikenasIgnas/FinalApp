/* eslint-disable max-len */
import { Box, TextField, Button } from '@mui/material';
import React from 'react';
import { post } from '../../../../Plugins/http';
import { useAppSelector } from '../../../../store/hooks';

type AddIncomeProps = {
    setIncome: (value:number) => void
    setBalance: (value:number) => void
    setExpenses: (value:number) => void
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>

    balance:number
};
let incomeArray:number[] = [];

const IncomeInput = ({
  setIncome, setBalance, setErrorMsg, setExpenses, balance,
}:AddIncomeProps) => {
  const [inputValue, setInputValue] = React.useState(0);
  const [inputField, setInputField] = React.useState(false);
  const secret = useAppSelector((state) => state.secret);

    const AddIncome = () => {
      setInputField(!inputField);
    };

    const handleInputChange = () => {
      if (inputValue !== 0) {
        setInputValue(0);
        if (inputField) {
          setInputField(!inputField);
          incomeArray.push(inputValue);
          const sumWithInitial = incomeArray.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0,
            );
            const balanceReduce = balance + inputValue;
            const updatedValues = {
              _id: String(Math.random()),
              income: sumWithInitial,
              expenses: 0,
              balance: balanceReduce,
              secret,
            };
          const update = async () => {
            await post('updateMoneyValues', updatedValues);
          };
          update();
          setBalance(balanceReduce);
            setIncome(sumWithInitial);
          }
        }
        setErrorMsg('');
      };
      const ResetIncome = () => {
        const updatedValues = {
          _id: String(Math.random()),
          income: 0,
          expenses: 0,
          balance: 0,
          secret,
        };
        const update = async () => {
          await post('updateMoneyValues', updatedValues);
          setExpenses(0);
          setIncome(0);
          setBalance(0);
        };
        update();
        incomeArray = [];
      };

    return (
      <Box sx={{ display: 'flex' }}>
        {inputField ? (
          <Box>
            <TextField
              inputProps={{ min: 1 }}
              type="number"
              onChange={(e) => setInputValue(Number(e.target.value))}
            />
            <Button variant="contained" onClick={handleInputChange}>Add</Button>
          </Box>
      ) : (
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Button
            variant="contained"
            sx={{ m: 'auto' }}
            onClick={AddIncome}
          >
            Add Income
          </Button>
          <Button
            variant="contained"
            sx={{ m: 'auto' }}
            onClick={ResetIncome}
          >
            Reset
          </Button>
        </Box>
)}

      </Box>
        );
};

export default IncomeInput;
