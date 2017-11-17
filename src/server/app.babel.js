require('babel-register')({
  presets: ['es2015', 'react', 'stage-0']
});

module.exports = require('./app.js');
