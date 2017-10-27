import { Provider } from 'react-redux';
import React from 'react';
import { renderStatic } from 'glamor/server';
import { renderToString } from 'react-dom/server';

import configureStore from '../src/redux/store/store';
import App from '../src/containers/app/app';

function renderFullPage(html, css, ids, preloadedState) {
  return `
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
        </script>
        <script src="/vendor.js"></script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  const store = configureStore();
  const { html, css, ids } = renderStatic(() => renderToString(<Provider store={store}><App /></Provider>)); //eslint-disable-line

  const preloadedState = store.getState();

  res.status(200).send(renderFullPage(html, css, ids, preloadedState));
}

export default handleRender;
