import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { getStore } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const store = getStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
