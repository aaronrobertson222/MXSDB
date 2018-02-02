require('babel-register')({
  presets: ['es2015', 'react', 'stage-0']
});
require('babel-polyfill');

module.exports = require('./app.js');
