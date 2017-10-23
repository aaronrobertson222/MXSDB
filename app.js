import { BasicStrategy } from 'passport-http';
import bodyParser from 'body-parser';
import csshook from 'css-modules-require-hook/preset';
import { createStore } from 'redux';
import express from 'express';
import favicon from 'serve-favicon';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/containers/app/app';
import mainReducer from './src/reducers/index.reducer';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(express.static(`${__dirname} /public`));
app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.ico')));
const { router: usersRouter, User } = require('./users');
const { router: uploadsRouter } = require('./uploads');
const {
  PORT,
  DATABASE_URL,
  SECRET,
  EXPIRATIONTIME,
} = require('./config');

mongoose.Promise = global.Promise;

app.use(passport.initialize());
require('./passport')(passport);

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  const store = createStore(mainReducer);

  const html = ReactDOMServer.renderToString(<Provider store={store}><App /></Provider>);

  const finalState = store.getState();

  res.send(renderFullPage(html, finalState));
}

app.use(handleRender);


// login authentication route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'missing field in body' });
  }
  User
    .findOne({ username })
    .exec()
    .then((_user) => {
      user = _user;
      if (!user) {
        return res.status(404).json({ message: 'Incorrect username.' });
      }
      return user.validatePassword(password);
    })
    .then((isValid) => {
      if (!isValid) {
        return res.status(400).json({ message: 'Incorrect password.' });
      }
      const token = jwt.sign(user, SECRET);
      res.status(200).json({
        success: true,
        token: `JWT ${token}`,
        tokenExpiration: new Date(Date.now() + EXPIRATIONTIME),
        user: user.apiRepr(),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Internal server error' });
    });
});
// get login page route
app.get('/login', (req, res) => res.status(200).sendFile(`${__dirname}/public/login.html`));
// get signup page route
app.get('/signup', (req, res) => res.status(200).sendFile(`${__dirname}/public/signup.html`));
// get user info for dashboard
app.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }), (req, res) => res.status(200).json({ user: req.user.apiRepr() }),
);
// get upload page route
app.get('/upload', (req, res) => res.status(200).sendFile(`${__dirname}/public/upload.html`));
// get tracks page route
app.get('/tracks', (req, res) => res.status(200).sendFile(`${__dirname}/public/tracks.html`));
// get bikes page route
app.get('/bikes', (req, res) => res.status(200).sendFile(`${__dirname}/public/bikes.html`));
// get gear page route
app.get('/gear', (req, res) => res.status(200).sendFile(`${__dirname}/public/gear.html`));

// routers
app.use('/users/', usersRouter);
app.use('/uploads/', uploadsRouter);

// catch route for any unhandle requested routes
app.use('*', (req, res) => res.status(404).json({ message: 'Not Found' }));

// server startup and shutdown functions
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
