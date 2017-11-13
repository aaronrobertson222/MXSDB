import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import AppRouter from 'containers/app-router';
import configureStore from '../client/redux/store/store';

module.exports = function serverRenderer(req, res) {
  const PROD = process.env.NODE_ENV === 'production';
  const STORE = configureStore();
  const HTML = PROD ? `<div id="app">${renderToString(<Provider store={STORE}><AppRouter /></Provider>)}</div>` : '<div id="app"></div>';

  const preloadedState = STORE.getState();

  // TODO: Dynamically change the script tags depending on if PRODUTION or DEV. Also url.
  return res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>MXSDB</title>
                <style>body {margin: 0;}</style>
            </head>
            <body>
              <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
              </script>
                ${HTML}
                <script src="/static/vendor.js"></script>
                <script src="/static/bundle.js"></script>
            </body>
            </html>
        `);

};
