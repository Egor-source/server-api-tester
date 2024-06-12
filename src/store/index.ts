import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokens from './tokens';
import rooms from './rooms';

const reducer = combineReducers({
  tokens,
  rooms,
});

export const store = () => configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
