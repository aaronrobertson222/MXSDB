import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';

import configureStore from '../src/redux/store/store';
import App from '../src/containers/app/app';

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>MXSDB</title>
        <link rel="stylesheet" href="index.css">
        <style>
          body {
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  const store = configureStore();
  const html = renderToString(<Provider store={store}><App /></Provider>);

  const preloadedState = store.getState();

  res.status(200).send(renderFullPage(html, preloadedState));
}

export default handleRender;
