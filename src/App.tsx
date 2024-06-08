import React, { FC } from 'react';
import './scss/index.scss';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/main/MainLayout';
import AuthLayout from './layouts/auth/AuthLayout';
import { isAuth } from './store/tokens';
import { useAppSelector } from './hooks/redux';

const App: FC = () => {
  const auth = useAppSelector(isAuth);
  return (
    <BrowserRouter>{auth ? <MainLayout /> : <AuthLayout />}</BrowserRouter>
  );
};

export default App;
