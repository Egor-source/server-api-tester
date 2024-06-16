import React, { ReactElement } from 'react';
import Main from '../pages/Main/Main';
import { Navigate, useRoutes } from 'react-router-dom';
import Rooms from '../pages/Rooms/Rooms';
import Room from '../pages/Room/Room';

export enum MainPaths {
  main = '/',
  rooms = ':roomType',
  room = ':roomType/:roomId',
}

export const mainRouter: () => ReactElement | null = () =>
  useRoutes([
    {
      path: MainPaths.main,
      element: <Main />,
    },
    {
      path: MainPaths.rooms,
      element: <Rooms />,
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
