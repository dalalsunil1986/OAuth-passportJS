const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy({
    // options for google strat
    callbackURL: '/auth/google/redirect',
    clientID: google.clientID,
    clientSecret: google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback func
    // check if user already exists in our DB
    User.findOne({
      googleId: profile.id
    }).then((currentUser) => {
      if (currentUser) {
        // already have the user
        console.log(`User is: ${currentUser}`);
        done(null, currentUser);
      } else {
        // create user in DB
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log(`new user created: ${newUser}`);
          done(null, newUser);
        })
      }
    })
  })
)