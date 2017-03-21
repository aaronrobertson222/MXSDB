const {BasicStrategy} = require('passport-http');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const {router: usersRouter, User} = require('./users');
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

app.post('/login', (req, res) => {
  console.log(req.user);
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
    .catch(err => console.log(err));
  });

app.get('/logout', (req, res) => {
  console.log(req.user);
  req.logOut();
  console.log(req.user);
  res.redirect('/');
});

require('./passport')(passport);

app.get('/me',
passport.authenticate('jwt', {session: false}), (req, res) => {
  res.status(200).json({user: req.user.apiRepr()});
});

app.get('/login', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/login.html');
});

app.get('/signup', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/signup.html');
});

app.get('/dashboard',
  passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.status(200).json({user: req.user.apiRepr()});
});

app.get('/upload', (req, res) => {
  return res.status(200).sendFile(__dirname + '/public/upload.html');
});

  //routes
app.use('/users/', usersRouter);

app.use('*', function(req, res) {
  return res.status(404).json({message: 'Not Found'});
});

//server startup and shutdown//
let server;

function runServer() {
  return new Promise((res, rej) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return rej(err);
      }
      console.log(`connected to ${DATABASE_URL}`);
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
  runServer().catch(err => console.log(err));
}

module.exports = {app, runServer, closeServer};
