const { BasicStrategy } = require('passport-http');
const express = require('express');
const passport = require('passport');
const { User } = require('./userModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

// POST route to create a new user
router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'No request body' });
  }

  if (!('username' in req.body)) {
    return res.status(422).json({ message: 'Missing field: username' });
  }

  let {
    username, password, firstName, lastName,
  } = req.body;


  if (typeof username !== 'string') {
    return res.status(422).json({ message: 'Incorrect field type: username' });
  }

  username = username.trim();

  if (username === '') {
    return res.status(422).json({ message: 'Incorrect field length: username' });
  }

  if (!(password)) {
    return res.status(422).json({ message: 'Missing field: password' });
  }

  if (typeof password !== 'string') {
    return res.status(422).json({ message: 'Incorrect field type: password' });
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({ message: 'Incorrect field length: password' });
  }

  return User
    .find({ username })
    .count()
    .exec()
    .then((count) => {
      if (count > 0) {
        return res.status(422).json({ message: 'Username already taken.' });
      }
      return User.hashPassword(password);
    })
    .then(hash => User
      .create({
        username,
        password: hash,
        firstName,
        lastName,
        joinedDate: Date.now(),
      }))
    .then(user => res.status(201).json(user.apiRepr()))
    .catch(err => res.status(500).sendFile(path.join(__dirname, '../public', 'error.html')));
});

router.get(
  '/downloadCount',
  passport.authenticate('jwt', { session: false }), (req, res) => Users
    .findOneAndUpdate({ _id: req.user._id }, { $inc: { uploads: 1 } })
    .exec()
    .then(item => res.status(200).json({ message: 'success' }))
    .catch(err => console.log(err))
);

require('../passport')(passport);

// route used to verify user has valid JWT
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }), (req, res, user) => {
    res.status(200).json({ user: req.user.apiRepr() });
  }
);

module.exports = { router };
