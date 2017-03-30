const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('./users/userModel');
const {SECRET} = require('./config');

//passport strategy that extracts JWT from header and gets user id

module.exports = function(passport){
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
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
          }
      });
  }));
}
