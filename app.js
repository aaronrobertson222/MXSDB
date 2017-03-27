const {BasicStrategy} = require('passport-http');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const {router: usersRouter, User} = require('./users');
const {router: uploadsRouter} = require('./uploads');
const {PORT, DATABASE_URL, SECRET, EXPIRATIONTIME} = require('./config');

mongoose.Promise = global.Promise;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serve static assets
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
require('./passport')(passport);


// login authentication route
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'missing field in body'});
  }
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return res.status(404).json({message: 'Incorrect username.'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return res.status(400).json({message: 'Incorrect password.'});
      } else {
        const token = jwt.sign(user, SECRET);
        res.status(200).json({
          success: true,
          token: 'JWT ' + token,
          tokenExpiration: new Date(Date.now() + EXPIRATIONTIME),
          user: user.apiRepr()
        });
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'});
    });
  });
// get login page route
app.get('/login', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/login.html');
});
// get signup page route
app.get('/signup', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/signup.html');
});
// get user info for dashboard
app.get('/dashboard',
  passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.status(200).json({user: req.user.apiRepr()});
});
// get upload page route
app.get('/upload', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/upload.html');
});
// get tracks page route
app.get('/tracks', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/tracks.html');
});
//get bikes page route
app.get('/bikes', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/bikes.html');
});
//get gear page route
app.get('/gear', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/gear.html');
});

//routers
app.use('/users/', usersRouter);
app.use('/uploads/', uploadsRouter);

// catch route for any unhandle requested routes
app.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});

//server startup and shutdown functions
let server;

function runServer(databaseUrl) {
  return new Promise((res, rej) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return rej(err);
      }
      console.log(`connected to ${databaseUrl}`);
      server = app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
        res();
      })
      .on('error', err => {
        mongoose.disconnect();
        rej(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((res, rej) => {
      console.log('Closing server.');
      server.close(err => {
        if (err) {
          return rej(err);
        }
        res();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.log(err));
}

module.exports = {app, runServer, closeServer};
