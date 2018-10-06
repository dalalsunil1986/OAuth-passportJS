const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('./keys');

passport.use(
  new GoogleStrategy({
    // options for google strat
    callbackURL: '/auth/google/redirect',
    clientID: google.clientID,
    clientSecret: google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback func
    console.log(`passport func called`);
    console.log(profile);
  })
)