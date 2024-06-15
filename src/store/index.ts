import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokens from './tokens';
import roomsTypes from './roomsTypes';
import rooms from './rooms';

const reducer = combineReducers({
  tokens,
  roomsTypes,
  rooms,
});

export const getStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof getStore>;
export type AppDispatch = AppStore['dispatch'];
