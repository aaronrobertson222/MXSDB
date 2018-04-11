import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRoot from './containers/app-root/app-root';

const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp(AppRoot);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
