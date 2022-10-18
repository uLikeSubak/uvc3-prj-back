const passport = require('passport');
// const local = require('./localStrategy');
const google = require('./googleStrategy'); // 구글서버 로그인
const naver = require('./naverStrategy'); // 네이버서버 로그인
const User = require('../models/user');

module.exports = () => {
  console.log('passport file')

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj)
    // User.findOne({
    //   where: { id }
    // })
    //   .then(user => done(null, user))
    //   .catch(err => done(err));
  });

  // local();
  // google();
  // naver();

}