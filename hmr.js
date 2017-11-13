const hmr = (app) => {
  const webpack = require('webpack');
  const webpackDevConfig = require('./webpack/webpack.config.development.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler, {
    reload: true
  }));

  return app;
};

module.exports = { hmr };
