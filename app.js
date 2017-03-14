const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {router: usersRouter} = require('./users');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

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
