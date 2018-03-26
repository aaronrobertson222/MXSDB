const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models').user;
const { SECRET } = require('./app.config');

// Extract JWT cookie if it exists
const extractJwtCookie = function(req) {
  let token = null;
  console.log(req.cookies); //eslint-disable-line
  // if req has cookie store it in token var. (substr to trim off 'JWT ' at beginning of token)
  if (req && req.cookies.auth_token) token = req.cookies.auth_token.substring(4);
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
