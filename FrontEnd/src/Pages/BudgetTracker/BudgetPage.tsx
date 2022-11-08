/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
import React from 'react';
import {
 Box,
 Button,
 Paper,
 TextField,
 Typography,
} from '@mui/material';
import IncomeExpensesBlock from './AddIncomeComponent/IncomeExpensesBlock';
import { post, get } from '../../Plugins/http';
import { useAppSelector } from '../../store/hooks';

type List = {
  _id:string,
  price: number,
  expense: string,
};

const BudgetPage = () => {
  const [income, setIncome] = React.useState<number>(0);
  const [balance, setBalance] = React.useState<number>(0);
  const [priceValues, setPriceValue] = React.useState<number>(0);
  const [expenses, setExpenses] = React.useState<number>(0);
  const [expenseName, setExpenseName] = React.useState('');
  const [list, setList] = React.useState<List[] >();
  const [added, setAdded] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const id = useAppSelector((state) => state.id);
  const secret = useAppSelector((state) => state.secret);

  React.useEffect(() => {
    // get
    (async () => {
      if (!list && id && secret) {
        const response = await get(`savedBudgetData/${id}/${secret}`);
        const res = await get(`latestMoneyValues/${id}/${secret}`);
        if (res.data) {
          setIncome(res.data.income);
          setExpenses(res.data.expenses);
          setBalance(res.data.balance);
        } else {
          setIncome(0);
          setExpenses(0);
          setBalance(0);
        }
        setList(response.data);
      }
    })();
  }, [list, id]);

  const AddListItem = async (price:number, name:string) => {
    // post
    if (price !== 0 && name !== '' && income !== 0) {
      try {
        const newExpense = {
          _id: String(Math.random()),
          price: priceValues,
          expense: expenseName,
          secret,
        };
        const moneyValues = {
          _id: String(Math.random()),
          income,
          expenses,
          balance,
          secret,
        };
        await post('budgetData', newExpense);
        await post('postMoneyValues', moneyValues);

        setList((prev) => (prev ? [...prev, newExpense] : [newExpense]));
        const TotalExpenses = [newExpense]?.reduce(
          (previousValue, currentValue) => previousValue + currentValue.price,
        expenses,
        );
        setExpenses(TotalExpenses);
        setExpenseName('');
        setPriceValue(0);
        setBalance(balance - price);
        setAdded(!added);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    if (income === 0) {
      setErrorMsg('Add Income First');
    }
  };

  if (added) {
    const updatedValues = {
      _id: String(Math.random()),
      income,
      balance,
      expenses,
      secret,
    };
    const update = async () => {
       await post('updateMoneyValues', updatedValues);
    };
    update();
    setAdded(!added);
  }

  const deleteItem = (_id:string) => {
    const newList = list?.filter((item) => item._id !== String(_id));
    const filterItem = async (id:string, price:number) => {
      if (id === _id) {
        const removeExpense = expenses - price;
        const removeBalance = balance + price;
        setExpenses(removeExpense);
        setBalance(removeBalance);
        const updatedValues = {
          _id: String(Math.random()),
          income,
          balance: removeBalance,
          expenses: removeExpense,
          secret,
        };
        const update = async () => {
           await post('updateMoneyValues', updatedValues);
        };
        update();
        await get(`deletePost/${id}/${secret}`);
      }
    };
    list?.filter((item) => filterItem(item._id, item.price));
    setList(newList);
  };

  return (
    <Box
      sx={{
          width: '100%',
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          padding: '50px',
        }}
      className="BudgedPageImage"
    >
      <Box>
        <Paper
          elevation={3}
          sx={{
          width: '100%',
          mb: '20px',
          textAlign: 'center',
        }}
        >
          <Typography sx={{ padding: '20px' }} variant="h5">Budget Tracker</Typography>
          <IncomeExpensesBlock
            setExpenses={setExpenses}
            expenses={expenses}
            setIncome={setIncome}
            income={income}
            balance={balance}
            setBalance={setBalance}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
          <Box sx={{ pb: '30px' }}>
            <TextField
              value={expenseName}
              id="outlined-basic"
              label="Expense"
              variant="outlined"
              onChange={(e) => setExpenseName(e.target.value)}
            />
            <TextField
              type="number"
              value={priceValues}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              onChange={(e) => setPriceValue(Number(e.target.value))}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ height: '55px' }}
              size="large"
              onClick={() => AddListItem(priceValues, expenseName)}
            >
              Add Item
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={5}
          sx={{
            width: '70%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            m: 'auto',
            p: list && list?.length > 0 ? '20px' : '0px',
            }}
        >
          {list?.map((el) => (

            <Paper
              key={el._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                m: '20px',
              }}
            >
              <Typography variant="h6" sx={{ padding: '10px' }}>
                Expense:
                {' '}
                {el.expense}
              </Typography>
              <Typography variant="h6">
                Price:
                {' '}
                {el.price}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{ height: 60 }}
                size="large"
                onClick={() => deleteItem(el._id)}
              >
                Delete
              </Button>
            </Paper>
))}
        </Paper>
      </Box>
    </Box>
    );
};

export default BudgetPage;
