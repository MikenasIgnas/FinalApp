import { Box, TextField, Button } from '@mui/material';
import React from 'react';

type AddIncomeProps = {
    setIncome: (value:number) => void
    setBalance: (value:number) => void
    setExpenses: (value:number) => void
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>
};
let incomeArray:string[] = [];
const IncomeInput = ({
 setIncome, setBalance, setErrorMsg, setExpenses,
}:AddIncomeProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const [inputField, setInputField] = React.useState(false);
    const AddIncome = () => {
      setInputField(!inputField);
    };
    const handleInputChange = () => {
      if (inputValue !== '') {
          setInputValue('');
        if (inputField) {
          setInputField(!inputField);
          incomeArray.push(inputValue);
          const sumWithInitial = incomeArray.reduce(
            (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
            0,
            );
            setIncome(sumWithInitial);
            setBalance(sumWithInitial);
          }
        }
        setErrorMsg('');
      };
      const ResetIncome = () => {
        incomeArray = [];
        setExpenses(0);
        setIncome(0);
        setBalance(0);
      };

    return (
      <Box sx={{ display: 'flex' }}>
        {inputField ? (
          <Box>
            <TextField
              inputProps={{ min: 1 }}
              type="number"
              onChange={(e) => setInputValue(e.target.value)}
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
