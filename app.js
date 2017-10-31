const { BasicStrategy } = require('passport-http');
const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

// Relative imports
const config = require('./webpack.config');
const { router: usersRouter } = require('./users');
const { router: uploadsRouter } = require('./uploads');
const {
  PORT,
  DATABASE_URL,
  SECRET,
  EXPIRATIONTIME,
} = require('./config');

const app = express();

mongoose.Promise = global.Promise;

// Webpack dev server middleware
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

//  standard app middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.ico')));

// passport init
app.use(passport.initialize());
require('./passport')(passport);

// routers
app.use('/users/', usersRouter);
app.use('/uploads/', uploadsRouter);

// Server start and stop util
let server;

function runServer(databaseUrl) {
  return new Promise((res, rej) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return rej(err);
      }
      console.log(`connected to ${databaseUrl}`);
      server = app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
        res();
      })
        .on('error', (err) => {
          mongoose.disconnect();
          rej(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => new Promise((res, rej) => {
    console.log('Closing server.');
    server.close((err) => {
      if (err) {
        return rej(err);
      }
      res();
    });
  }));
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };
