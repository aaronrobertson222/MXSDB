import { BasicStrategy } from 'passport-http';
import bodyParser from 'body-parser';
import csshook from 'css-modules-require-hook/preset';
import express from 'express';
import favicon from 'serve-favicon';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// relative imports
import config from './webpack.config';
import handleRender from './middleware/handleRender';

const app = express();

// env variables and paths
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv !== 'development';
const buildPath = path.join(__dirname, './build/');
const srcPath = path.join(__dirname, './src/');

const { router: usersRouter, User } = require('./users');
const { router: uploadsRouter } = require('./uploads');
const {
  PORT,
  DATABASE_URL,
  SECRET,
  EXPIRATIONTIME,
} = require('./config');

mongoose.Promise = global.Promise;

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  contentBase: isProduction ? buildPath : srcPath,
  historyApiFallback: true,
  compress: isProduction,
  inline: !isProduction,
  hot: !isProduction,
  stats: {
    assets: true,
    children: false,
    chunks: true,
    hash: false,
    modules: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
      green: '\u001b[32m',
    },
  },
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));


//  standard app middleware
app.use(handleRender);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.ico')));

// passport init
app.use(passport.initialize());
require('./passport')(passport);


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



// routers
app.use('/users/', usersRouter);
app.use('/uploads/', uploadsRouter);

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
