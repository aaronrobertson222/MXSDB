const usersRouter = require('./users');

module.exports = (app) => {
  app.use('/api/users', usersRouter);
};
