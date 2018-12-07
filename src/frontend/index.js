import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

import store from './state';

import AppRoot from './components/AppRoot';

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  </Provider>
)
