const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: new Date().toLocaleTimeString(),
      colorize: true,
      level: 'info'
    }),
  ]
});

module.exports = { logger };
