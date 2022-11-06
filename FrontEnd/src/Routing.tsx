import * as React from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from './GlobalComponents/Auth/Auth-Layout';
import GlobalLayout from './GlobalComponents/Components/GlobalLayout';
import NewsSection from './Pages/NewsPage/MainSection/NewsSection';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import './styles/index.scss';
import TaxApp from './Pages/TaxCalculator/TaxApp';
import HomePage from './Pages/HomePage/HomePage';
import BudgetPage from './Pages/BudgetTracker/BudgetPage';
import SinglePost from './Pages/NewsPage/MainSection/SingleFinancialPost';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import StocksPage from './Pages/Stocks/StocksPage';
import LogedInPage from './Pages/LogedInPage/LogedInPage';
import { useAppSelector } from './store/hooks';
import { setUserData } from './auth/reducer';

const App: React.FC = () => {
  const [appInitialised, setAppInitialised] = React.useState(false);
  const token = useAppSelector((state) => state.id);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!appInitialised) {
      const id = localStorage.getItem('id');
      const username = localStorage.getItem('username');
      const secret = localStorage.getItem('secret');

      if (username && id && secret) {
        dispatch(setUserData({ username, id, secret }));
      }
      setAppInitialised(true);
    }
  }, []);

  return (appInitialised
    ? (
      <BrowserRouter>
        {token
    ? (
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="LogedInPage" element={<LogedInPage />} />
          <Route path="news" element={<NewsSection />} />
          <Route path="WorldNews" element={<NewsSection />} />
          <Route path="post/:id" element={(<SinglePost />)} />
          <Route path="Stocks" element={<StocksPage />} />
          <Route path="BudgetTracker" element={<BudgetPage />} />
          <Route path="IncomeTracker" element={<TaxApp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
       )
    : (
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<HomePage />} />
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="RegisterPage" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
        )}
      </BrowserRouter>
) : null
  );
  };
export default App;
