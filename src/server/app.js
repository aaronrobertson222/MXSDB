// TODO: Conver requires to es6 imports and other es6 stuff.
const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
require('css-modules-require-hook/preset');

// Relative imports
const {
  PORT,
} = require('./config/app.config');
const serverRenderer = require('./server.jsx');
const isProduction = process.env.NODE_ENV === 'production';
const { logger } = require('./config/logger.config');

const app = express();

//  standard app middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(favicon(path.join(process.cwd(), 'src', 'client', 'assets', 'images', 'favicon.ico')));

require('./routes')(app);

if (isProduction) {
  app.use('/static', express.static('build'));
  app.get('*', serverRenderer);
} else {
  const { hmr } = require('./hmr.js');
  // Hot Module Reloading
  hmr(app);
  app.get('*', serverRenderer);
}

// Server start and stop util
let server;

function runServer() {
  return new Promise((res, rej) => { //eslint-disable-line
    server = app.listen(PORT, () => {
      logger.info(`App is listening on port ${PORT}`);
      return res();
    });
  });
}

function closeServer() {
  new Promise((res, rej) => {
    logger.info('Closing server.');
    server.close((err) => {
      if (err) {
        return rej(err);
      }
      return res();
    });
  });
}

runServer().catch(err => logger.error(err));
if (require.main === module) {
  runServer().catch(err => logger.error(err));
}

module.exports = { app, runServer, closeServer };
