import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import AppRouter from 'containers/app-router';
import configureStore from './redux/store/store';


const preloadedState = window.__PRELOADED_STATE__; //eslint-disable-line

delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

const App = () => (
  <AppContainer>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </AppContainer>
);

if (module.hot) {
  module.hot.accept('./containers/app-router', () => {
    const nextApp = require('./containers/app-router');
    renderApp(nextApp);
  });
}

export default App;
