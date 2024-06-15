import React, { ReactElement } from 'react';
import Main from '../pages/Main/Main';
import { Navigate, useRoutes } from 'react-router-dom';
import Rooms from '../pages/Room/Rooms';

export enum MainPaths {
  main = '/',
  room = '/:roomType',
}

export const mainRouter: () => ReactElement | null = () =>
  useRoutes([
    {
      path: MainPaths.main,
      element: <Main />,
    },
    {
      path: MainPaths.room,
      element: <Rooms />,
    },
    {
      path: '*',
      element: <Navigate to={MainPaths.main} />,
    },
  ]);
