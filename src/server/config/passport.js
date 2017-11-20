const JwtStrategy = require('passport-jwt').Strategy;
const {User} = require('../users/userModel');
const {SECRET} = require('./app.config');

// Extract JWT cookie if it exists
const extractJwtCookie = function(req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

// Passport strat that pulls jwt from req cookie
module.exports = function(passport){
  const opts = {};
  opts.jwtFromRequest = extractJwtCookie;
  opts.secretOrKey = SECRET;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User
      .findOne({_id: jwt_payload._doc._id},
        function(err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }});
  }));
};
