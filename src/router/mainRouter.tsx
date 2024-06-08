import React, { ReactElement } from 'react';
import Main from '../pages/Main/Main';
import { Navigate, useRoutes } from 'react-router-dom';

export enum MainPaths {
  main = '/',
}

export const mainRouter: () => ReactElement | null = () =>
  useRoutes([
    {
      path: MainPaths.main,
      element: <Main />,
    },
    {
      path: '*',
      element: <Navigate to={MainPaths.main} />,
    },
  ]);
