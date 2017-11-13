require('babel-register')({
  presets: ['es2015', 'react'],
});

module.exports = require('./app.js');
