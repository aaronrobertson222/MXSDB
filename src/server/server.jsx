import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';

import configureStore from '../client/redux/store/store';

module.exports = function serverRenderer(req, res) {
  let preloadedState = {};
  if (req.user) {
    preloadedState = { user: { user: req.user.apiRepr() } };
  }
  const history = createHistory();
  const PROD = process.env.NODE_ENV === 'production';
  const STORE = configureStore(preloadedState, history);

  const context = {};

  const finalState = STORE.store.getState();
  const initialState = `window.__PRELOADED_STATE__ = ${JSON.stringify(finalState)}`;

  const Layout = PROD ? require('../../build/prerender') : () => {};

  const appRoot = PROD && renderToString(
    <Provider store={STORE.store}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </Provider>
  );

  // Render Html to be returned
  const html = renderToString(
    <html>
      <head>
        <title>MXSDB</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{__html: initialState}} />
        {PROD ? <div id="app" dangerouslySetInnerHTML={{__html: appRoot}}></div> : <div id="app"></div>}
        {PROD && <script src="vendor.js"></script>}
        <script src={PROD ? 'bundle.js' : '/static/bundle.js'}></script>
      </body>
    </html>
  );

  return res.status(200).send('<!DOCTYPE html>' + html);
};
