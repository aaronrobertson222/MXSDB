const usersRouter = require('./users');
const uploadsRouter = require('./uploads');
module.exports = (app) => {
  app.use('/api/users', usersRouter);
  app.use('/api/uploads', uploadsRouter);
};
