import React, { ReactElement } from 'react';
import Login from '../pages/Login/Login';
import { useRoutes, Navigate } from 'react-router-dom';

export enum AuthPaths {
  login = '/login',
}

export const authRouter: () => ReactElement | null = () =>
  useRoutes([
    {
      path: AuthPaths.login,
      element: <Login />,
    },
    {
      path: '*',
      element: <Navigate to={AuthPaths.login} />,
    },
  ]);
