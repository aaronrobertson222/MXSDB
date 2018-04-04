import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import AppRouter from './containers/app-router/app-router';

import configureStore from '../universal/redux/store/store';

import history from '../universal/utils/history.js';

// Create var to store preloaded state from server and delete window prop
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

// Create browser history and redux store
const store = configureStore(preloadedState, history);
const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp(AppRouter);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept('./containers/app-router/app-router', () => {
    const nextApp = require('./containers/app-router/app-router');
    renderApp(nextApp);
  });
}
