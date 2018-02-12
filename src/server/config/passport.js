const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').user;
const { SECRET } = require('./app.config');

// Extract JWT cookie if it exists
/*
const extractJwtCookie = function(req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};
*/

// Passport strat that pulls jwt from req cookie
module.exports = function(passport){
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = SECRET;
  passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const user = await User
        .findOne({
          where: {
            id: jwt_payload.id
          }
        });

        console.log(user); //eslint-disable-line

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
