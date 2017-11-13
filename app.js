// TODO: Conver requires to es6 imports and other es6 stuff.
const { BasicStrategy } = require('passport-http');
const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
require('css-modules-require-hook/preset');

// Relative imports
const { router: usersRouter } = require('./users');
const { router: uploadsRouter } = require('./uploads');
const {
  PORT,
  DATABASE_URL,
  SECRET,
  EXPIRATIONTIME,
} = require('./config');

const serverRenderer = require('./server.jsx');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

mongoose.Promise = global.Promise;

if (isProduction) {
  app.use('/static', express.static('build'));
  app.get('*', serverRenderer);
} else {
  const { hmr } = require('./hmr.js');
  // Hot Module Reloading
  hmr(app);
  app.get('*', serverRenderer);
}


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
        return res();
      })
        .on('error', (err) => {
          mongoose.disconnect();
          return rej(err);
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
      return res();
    });
  }));
}

runServer(DATABASE_URL).catch(err => console.log(err));
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };
