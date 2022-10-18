const passport = rqeuire('passport');
const naver = require('./naverStrategy');

const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });


  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  naver(); // 네이버 전략 등록
}