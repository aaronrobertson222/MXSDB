import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from './src/containers/app';
import configureStore from './src/redux/store/store';

module.exports = function serverRenderer() {
  return (req, res) => {
    const STORE = configureStore();
    const HTML = renderToString(<Provider store={STORE}><App /></Provider>);

    const preloadedState = STORE.getState();

    res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>MXSDB</title>
                <style>body {margin: 0;}</style>
            </head>
            <body>
                <div id="app">${HTML}</div>
                <script>
                  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
                </script>
                <script src="/vendor.js"></script>
                <script src="/bundle.js"></script>
            </body>
            </html>
        `);
  };
};
