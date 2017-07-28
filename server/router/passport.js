const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../db/models/User');
const GoogleKey = require('../../private/config.keys.js').google;


module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.dataValues.id);
  });

  passport.deserializeUser((user, done) => {
    User.findById(user)
      .then((user) => {
        done(null, user);
      });
  });

  // Google oauth setup
  passport.use(new GoogleStrategy({
    clientID: GoogleKey.clientID,
    clientSecret: GoogleKey.clientSecret,
    callbackURL: 'http://localhost:2245/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ where: { googleId: profile.id } })
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          const newUser = new User();
          newUser.name = profile.displayName;
          newUser.googleId = profile.id;
          newUser.save((err) => {
            if (err) { throw err; }
            return done(null, newUser);
          });
        }
      });
  }));
};

