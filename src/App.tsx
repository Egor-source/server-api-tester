import React, { FC } from 'react';
import './scss/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="App"></div>
    </Provider>
  );
};

export default App;
