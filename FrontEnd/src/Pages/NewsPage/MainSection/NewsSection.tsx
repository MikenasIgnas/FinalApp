/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsType, WorldNewsType } from '../../../globalTypes/newsType';
import NewsService from '../../../Services/FetchNews';
import FinancialNewsCard from './FinancialNewsCard';
import WorldNewsCard from './WorldNewsCard';

const API_KEY = '3501547d433244bbb75264d1d9af4ec5';
const newsApi = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const MainSection = () => {
  const [financialNews, setFinancialNews] = React.useState<NewsType>();
  const [worldNews, setWorldNews] = React.useState<WorldNewsType>();
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (!financialNews) {
        const fetchedNews = await NewsService.fetchNews();
        if (fetchedNews) {
          setFinancialNews(fetchedNews);
          setClicked(false);
        }
      }
      })();
  }, []);

  const navigate = useNavigate();
  const getWorldNews = async () => {
    const data = await fetch(newsApi);
    const res = await data.json();
    setWorldNews(res);
    navigate('/WorldNews');

    setClicked(true);
  };

  const getFinanceNews = async () => {
    navigate('/news');
    setClicked(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '120%',
      }}
      className={!clicked ? 'FinanceNewsBG' : 'WorldNewsBG'}
    >
      <Box sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mt: '20px',
    }}
      >
        {!clicked ? (
          <Button
            onClick={getWorldNews}
            variant="contained"
          >
            Read World News
          </Button>
) : (
  <Button
    onClick={getFinanceNews}
    variant="contained"
  >
    Read Finance News
  </Button>
)}
      </Box>

      {!clicked ? financialNews && financialNews?.results?.map((el) => (
        <FinancialNewsCard
          key={el.id}
          results={{
              description: el.description,
              image_url: el.image_url,
              published_utc: el.published_utc,
              tickers: el.tickers,
              title: el.title,
              id: el.id,
              article_url: el.article_url,
            }}
        />
          ))
          : worldNews?.articles?.map((el, i) => (
            <WorldNewsCard
              key={i}
              articles={{
                  author: el.author,
                  content: el.content,
                  url: el.url,
                  description: el.description,
                  urlToImage: el.urlToImage,
                  publishedAt: el.publishedAt,
                  title: el.title,
              }}
            />
            ))}
    </Box>
    );
};

export default MainSection;
