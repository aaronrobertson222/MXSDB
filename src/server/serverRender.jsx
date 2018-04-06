import fs from 'fs';
import {basename, join} from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';

// Hook for css modules on server side
import hook from 'css-modules-require-hook';

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss'],
});

import configureStore from '../universal/redux/store/store';

import Html from './html';

function renderApp(url, res, store, assets) {
  const context = {};

  const html = renderToString(
    <Html
      title="MXSDB"
      store={store}
      url={url}
      context={context}
      assets={assets}
    />
  );

  res.send('<!DOCTYPE html>' + html);
}

export const renderPage = function(req, res) {
  const history = createHistory();

  let preloadedState = {};
  if (req.user) {
    preloadedState = { user: { user: req.user.apiRepr() } };
  }

  const store = configureStore(preloadedState, history);

  const assets = require('../../build/assets.json');

  assets.manifest.text = fs.readFileSync(
    join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
    'utf-8'
  );

  renderApp(req.url, res, store, assets);
};

export const renderDevPage = function(req, res) {
  const history = createHistory();

  let preloadedState = {};
  if (req.user) {
    preloadedState = { user: { user: req.user.apiRepr() } };
  }

  const store = configureStore(preloadedState, history);

  renderApp(req.url, res, store);
};
