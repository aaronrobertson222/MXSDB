import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';

import AppRouter from 'containers/app-router';

import configureStore from './redux/store/store';

// Create var to store preloaded state from server and delete window prop
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

// Create browser history and redux store
const history = createHistory();
const store = configureStore(preloadedState, history);

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <AppRouter history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp();

// Hot Module Replacement
if (module.hot) {
  module.hot.accept('./containers/app-router', () => {
    const nextApp = require('./containers/app-router');
    renderApp(nextApp);
  });
}
