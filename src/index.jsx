import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import AppRouter from 'containers/app-router';
import configureStore from './redux/store/store';

const preloadedState = window.__PRELOADED_STATE__; //eslint-disable-line

delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

const renderApp = () => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./containers/app-router', () => {
    const nextApp = require('./containers/app-router');
    renderApp(nextApp);
  });
}