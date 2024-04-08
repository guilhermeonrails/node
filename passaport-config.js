const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
// const OAuthUser = require('./models/oauthUser');

require('dotenv').config();

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
async function(accessToken, refreshToken, profile, done) {
  // console.log({ accessToken, refreshToken, profile });
  // const oauthUser = new OAuthUser(profile.id, profile.username)
  // const user = await oauthUser.findOrCreate(oauthUser)
  return done(null, profile.id)
}));


module.exports = passport;
