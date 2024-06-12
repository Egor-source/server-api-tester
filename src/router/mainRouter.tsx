import React, { ReactElement } from 'react';
import Main from '../pages/Main/Main';
import { Navigate, useRoutes } from 'react-router-dom';
import Room from '../pages/Room/Room';

export enum MainPaths {
  main = '/',
  room = '/:roomName',
}

export const mainRouter: () => ReactElement | null = () =>
  useRoutes([
    {
      path: MainPaths.main,
      element: <Main />,
    },
    {
      path: MainPaths.room,
      element: <Room />,
    },
    {
      path: '*',
      element: <Navigate to={MainPaths.main} />,
    },
  ]);
