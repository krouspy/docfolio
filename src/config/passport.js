const LocalStrategy = require('passport-local').Strategy;
const { login } = require('../controllers/index');

module.exports = passport => {
  passport.use('login', new LocalStrategy({ usernameField: 'email' }, login));

  passport.serializeUser((user, done) => {
    done(null, 10);
  });

  passport.deserializeUser((id, done) => {
    done(null, { name: 'kenji' });
  });
};
