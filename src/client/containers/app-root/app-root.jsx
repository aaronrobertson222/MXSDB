import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';

import configureStore from '../../../universal/redux/store/store';
import history from '../../../universal/utils/history.js';
import routes from '../../../universal/routes/routes';

// Create var to store preloaded state from server and delete window prop
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

// Create browser history and redux store
const store = configureStore(preloadedState, history);

const AppRoot = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>
);


export default AppRoot;
