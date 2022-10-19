const passport = require('passport');
// const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const User = require('../models/user');
const NaverStrategy = require('passport-naver').Strategy;

module.exports = () => {
  passport.use(new NaverStrategy({

    clientID: process.env.NAVER_ID,
    clientSecret: process.env.NAVER_SECRET,
    callbackURL: 'auth/naver/callback',  // 네이버로부터 인증결과를 받을 라우터 주소
  }, async (accessToken, refreshToken, response, done) => {
    console.log('naver profile', response);

    try {
      const exUser = await User.findOne({
        where: { id: response.id, provider: 'naver' },
      });

      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: response.emails[0].value,
          nick: response.id,
          // snsId: response.id,
          provider: 'naver',
          // naver: response._json
        });
        done(null, newUser);
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  }));
};


// module.exports = () => {
//   console.log('1')
//   passport.use(new NaverStrategy({
//     clientID: process.env.NAVER_ID,
//     clientSecret: process.env.NAVER_SECRET,
//     callbackURL: '/auth/naver/callback'
//   },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log('실행')
//       User.findOne({
//         'naver.id': profile.id
//       }, function (err, user) {
//         if (!user) {
//           user = new User({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             nick: profile.displayName,
//             provider: 'naver',
//             // pfo: profile._json
//           });
//           user.save(function (err) {
//             if (err) console.log(err);
//             return done(err, user);
//           });
//         } else {
//           return done(err, user);
//         }
//       });
//     }
//   ));
// }




// module.exports = () => {
//   passport.use(
//     new NaverStrategy(
//       {
//         clientID: process.env.NAVER_ID,
//         clientSecret: process.env.NAVER_SECRET,
//         callbackURL: 'https://localhost:8080/',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         console.log('naver profile : ', profile);
//         try {
//           const exUser = await User.findOne({
//             // 네이버 플랫폼에서 로그인 했고, & snsId 필드에 네이버 아이디가 일치할 경우
//             where: { snsId: profile.id, provider: 'naver' },
//           });
//           // 이미 가입된 네이버 프로필이면 성공
//           if (exUser) {
//             done(null, exUser);
//           } else {
//             // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
//             const newUser = await User.create({
//               email: profile.email,
//               nick: profile.name,
//               snsId: profile.id,
//               provider: 'naver',
//             });
//             done(null, newUser);
//           }
//         } catch (error) {
//           console.error(error);
//           done(error);
//         }
//       }
//     )
//   )
// }