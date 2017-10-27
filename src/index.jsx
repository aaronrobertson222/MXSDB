import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/store/store';

import App from 'containers/app/app';

const preloadedState = window.__PRELOADED_STATE__; //eslint-disable-line

delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
