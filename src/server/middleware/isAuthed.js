exports.isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) next(err);
    if (!user) {
      return next();
    }
    req.user = user;
    return next();
  })(req, res, next);
};
