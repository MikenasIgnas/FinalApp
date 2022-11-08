/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';
import StockFinder from './StockFinder';
import IndexButtons from './IndexButtons';

const apiKey = 'u3kgJbNWRuSEMJgsquAiyX';
const StocksApi = `https://fcsapi.com/api-v3/stock/list?country=United-states&access_key=${apiKey}`;
const indiciesApi = `https://fcsapi.com/api-v3/stock/indices?country=United-states&access_key=${apiKey}`;

type Stocks = {
  ccy:string,
  country:string,
  exch:string,
  id:string,
  name:string,
  sector:string,
  short_name:string,
};
type Indicies = {
  country:string,
  full_name:string,
  index_id:string,
  index_name:string,
};

const StocksPage = () => {
    const [ticker, setTicker] = React.useState<string | null | undefined>();
    const [series, setSeries] = React.useState([{
    data: [],
   }]);
    const [stocks, setStocks] = React.useState<Stocks[]>([]);
    const [indicies, setIndicies] = React.useState<Indicies[]>([]);
    const [indexName, setIndexName] = React.useState('SPY');
    const [price, setPrice] = React.useState(-1);
    const [stockName, setStockName] = React.useState<string | null | undefined>('S&P 500');
    const [changeValue, setChangeValue] = React.useState(false);
    const [priceTime, setPriceTime] = React.useState(new Date());
    const [category, setCategory] = React.useState('Index');
    const [etfName, setEtfName] = React.useState('SPY');
    const indeciesURL = `https://yahoo-finance-api.vercel.app/${indexName}`;
    const stonksUrl = `https://yahoo-finance-api.vercel.app/${ticker}`;
    const round = (number:number) => (number ? +(number.toFixed(2)) : null);
    const getStocks = async () => {
          const response = await fetch(stonksUrl);
          const data = await response.json();
          return data;
        };

    const chart:any = {
        options: {
          chart: {
            type: 'candlestick',
            height: 350,
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left',
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            tooltip: {
            enabled: true,
            },
          },
        },
      };

    React.useEffect(() => {
      const indiciesAPI = async () => {
      const response = await fetch(indiciesApi);
      const data = await response.json();
      const res = await fetch(indeciesURL);
      const indexData = await res.json();
      const stock = indexData.chart.result[0];
      const quote = stock.indicators.quote[0];
      const prices = stock.timestamp.map((timestamp:number, index:number) => ({
          x: new Date(timestamp * 1000),
          y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round),
        }));
        setIndicies(data.response);
        setPrice(stock.meta.regularMarketPrice.toFixed(2));
        setPriceTime(new Date(stock.meta.regularMarketTime * 1000));
        setSeries([{
         data: prices,
        }]);
          };
        indiciesAPI();
    }, [indexName]);

    React.useEffect(() => {
      const getLatestPrice = async () => {
      try {
        const stocksAPI = async () => {
        const response = await fetch(StocksApi);
        const data = await response.json();
        setStocks(data.response);
        };
        stocksAPI();
        const data = await getStocks();
        const stock = data.chart.result[0];
        const quote = stock.indicators.quote[0];
        setPrice(stock.meta.regularMarketPrice.toFixed(2));
        setPriceTime(new Date(stock.meta.regularMarketTime * 1000));
        const prices = stock.timestamp.map((timestamp:number, index:number) => ({
          x: new Date(timestamp * 1000),
          y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round),
        }));
        setSeries([{
          data: prices,
        }]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      };
        getLatestPrice();
      }, [ticker]);

      const filteredIndicies = indicies.map((el) => {
        if (el.index_name === 'S&P 500' || el.index_name === 'Nasdaq 100') {
        return el;
        }
      })
      .filter((el) => el !== undefined);
    const selectedStock = stocks.map((el) => {
      if (el.short_name === ticker) {
      return {
        name: el.name,
        ticker: el.short_name,
        exhange: el.exch,
      };
      }
    }).filter((el) => el !== undefined);

    const handleChange = (event:any, value:any) => {
      const filteredTicker = stocks.find((el) => el.name === value);
      setTicker(filteredTicker?.short_name);
      setStockName(filteredTicker?.name);
      setCategory('Stock');
      setChangeValue(true);
    };

    const filterUnique = (arr: string[]) => {
      const newArray: string[] = [];
      arr.map((val) => {
        if (!newArray.includes(val)) {
          newArray.push(val);
        }
      });
      return newArray;
    };

    const stockNames = filterUnique(stocks.map((el) => el.name));

   return (
     <Box sx={{ width: '100%', height: '100vh' }}>
       <Box sx={{
            width: '100%',
            height: '100%',
        }}
       >
         <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
          }}
         >
           <StockFinder handleChange={handleChange} stockNames={stockNames} />
           <Box sx={{ padding: '20px' }}>
             Indicies:
             {' '}
             {filteredIndicies.map((el, i) => (
               <IndexButtons
                 key={i}
                 setCategory={setCategory}
                 setStockName={setStockName}
                 setIndexName={setIndexName}
                 indexName={el?.index_name}
                 setChangeValue={setChangeValue}
                 setEtfName={setEtfName}
               />
           ))}
           </Box>
         </Box>
         <Box>
           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
             <Paper elevation={6} sx={{ width: '300px', textAlign: 'center', padding: '10px' }}>
               <Typography variant="h5">
                 {category}
                 :
                 {' '}
                 {!changeValue ? stockName : selectedStock?.[0]?.name}

               </Typography>
               <Typography variant="h6">
                 Ticker:
                 {' '}
                 {!changeValue ? etfName : selectedStock?.[0]?.ticker}
               </Typography>
               <Typography variant="h6">
                 Exange:
                 {' '}
                 {selectedStock[0]?.exhange}
               </Typography>
               <Typography variant="h6">
                 Current Price
                 {' '}
                 $
                 {price}
               </Typography>
             </Paper>
           </Box>
           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
             <Box />
           </Box>
           <Box>
             <Typography>
               {priceTime && priceTime.toLocaleTimeString()}
             </Typography>
           </Box>
         </Box>
         <Chart options={chart.options} series={series} type="candlestick" width="100%" height={320} />
       </Box>
     </Box>
        );
};

export default StocksPage;
