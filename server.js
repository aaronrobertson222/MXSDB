import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStatic } from 'glamor/server';
import { Provider } from 'react-redux';

import App from 'containers/app/app';
import configureStore from './src/redux/store/store';

module.exports = function serverRenderer({ clientStats, serverStats }) {
  return (req, res) => {
    const store = configureStore();
    const { html, css, ids } = renderStatic(() => (
      renderToString(<Provider store={store}><App /></Provider>)
    ));

    const preloadedState = store.getState();

    res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>MXSDB</title>
                <style>body {margin: 0;}</style>
                <style>${css}</style>
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
                  window.__ids__ = ${JSON.stringify(ids)}
                </script>
                <script src="/vendor.js"></script>
                <script src="/bundle.js"></script>
            </body>
            </html>
        `);
  };
};
