const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

// Hook for css modules on server side
const hook = require('css-modules-require-hook');

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss'],
  rootDir: path.resolve(__dirname, '..'),
});

// Config imports
const { PORT } = require('./config/app.config');
const isProduction = process.env.NODE_ENV === 'production';
const { logger } = require('./config/logger.config');

// SSR imports
const {
  renderPage,
  renderDevPage
} = require('./serverRender.jsx');

const app = express();

// App middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(favicon(path.join(process.cwd(), 'src', 'universal', 'assets', 'images', 'favicon.ico')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// Passport initialization
app.use(passport.initialize());
require('./config/passport.js')(passport);


require('./routes')(app);

function isAuthenticated(req, res, next) {
  passport.authenticate('jwt', (err, user) => {
    if (err) next(err);
    if (!user) {
      return next();
    }
    req.user = user;
    return next();
  })(req, res, next);
}

if (isProduction) {
  app.use('/static', express.static('build'));
  app.get('*', isAuthenticated, renderPage);
} else {
  const { hmr } = require('./hmr.js');
  // Hot module reloading for dev
  hmr(app);
  app.get('*', isAuthenticated, renderDevPage);
}

// Server start and stop util
let server;

function runServer() {
  return new Promise((res, rej) => { //eslint-disable-line
    server = app.listen(PORT, () => {
      logger.info(`App is listening on port ${PORT}`);
      return res();
    });
  });
}

function closeServer() {
  new Promise((res, rej) => {
    logger.info('Closing server.');
    server.close((err) => {
      if (err) {
        return rej(err);
      }
      return res();
    });
  });
}

runServer().catch(err => logger.error(err));
if (require.main === module) {
  runServer().catch(err => logger.error(err));
}

module.exports = { app, runServer, closeServer };
