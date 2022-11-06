/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

type StockFinderProps = {

    handleChange: (event: any, value: any) => void
    stockNames:string[]
};
const StockFinder = ({ handleChange, stockNames }:StockFinderProps) => (
  <Autocomplete
    onChange={handleChange}
    disablePortal
    id="combo-box-demo"
    options={stockNames}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Stocks" />}
  />
  );
export default StockFinder;
