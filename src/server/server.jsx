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

  //const layout = PROD ? require('../../build/prerender') : () => {};
  const HTML = PROD ? (
    `<div id="app">
    ${renderToString(
      <Provider store={STORE}>
        <StaticRouter>
        </StaticRouter>
      </Provider>)}
    </div>`)
    :
    ('<div id="app"></div>');

  const finalState = STORE.store.getState();

  // TODO: Dynamically change the script tags depending on if PRODUTION or DEV. Also url.
  return res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>MXSDB</title>
                <style>body {margin: 0;}</style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
            </head>
            <body>
              <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')};
              </script>
                ${HTML}
                <script src="/static/vendor.js"></script>
                <script src="/static/bundle.js"></script>
            </body>
            </html>
        `);

};
