const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models').user;
const { SECRET } = require('./app.config');

// Extract JWT cookie if it exists

const extractJwtCookie = function(req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['auth_token'];
  return token;
};


// Passport strat that pulls jwt from req cookie
module.exports = function(passport){
  const opts = {};
  opts.jwtFromRequest = extractJwtCookie;
  opts.secretOrKey = SECRET;
  passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const user = await User
        .findById(jwt_payload.id);

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch(err) {
      return done(err, false);
    }
  }));
};
