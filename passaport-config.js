const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/user')

require('dotenv').config();

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new LocalStrategy(
  (username, password, done) => {
      const user = User.findOne(username, password);
      if (!user) {
          return done(null, false);
      }
      return done(null, user);
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
async function(accessToken, refreshToken, profile, done) {
  // console.log({ accessToken, refreshToken, profile, done });
  return done(null, profile.id)
}));


module.exports = passport;
