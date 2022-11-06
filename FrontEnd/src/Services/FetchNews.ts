import { NewsType } from '../globalTypes/newsType';

const API_KEY = 'axSyMktNCVJkGFMgRpuxEaIec8ex0ZXd';
const API = `https://api.polygon.io/v2/reference/news?apiKey=${API_KEY}`;
const fetchNews = async (): Promise<NewsType> => {
  const response = await fetch(API);
  const fetchedNews = await response.json();
  return fetchedNews as NewsType;
};
const fetchOne = async (): Promise<NewsType> => {
  const response = await fetch(API);
  const fetchedCup = await response.json();

  return fetchedCup;
};
const NewsService = {
    fetchNews,
    fetchOne,
};

export default NewsService;
