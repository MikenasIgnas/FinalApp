import React from 'react';

import { Pie } from 'react-chartjs-2';
 import 'chart.js/auto';
import { Box } from '@mui/material';
import calcultateTaxes, { TaxesProps } from './CalculateTaxes';

  const ChartData = ({ incomeValue, rentValue, taxesValue }:TaxesProps) => {
  const data = {
      labels: [
        'Tax-free amount of income(NPD)',
        'Income tax(GPM)',
        'Compulsory health insurance(Sodra)',
        'National social insurance(VSD)',
        'Housing Rent',
        'Utility Taxes',
        'Payed Ammount',
        'Total Left',
      ],
      datasets: [
        {
          label: '',
          data: [
            ...calcultateTaxes({ incomeValue, rentValue, taxesValue }),
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <Box>
        <Pie data={data} />
      </Box>
      );
  };

  export default ChartData;
