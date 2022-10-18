const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');


module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        ClienetSecret : process.env.GOOGLE_SERCRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('google profile : ', profile);
        try{
          const exUser = await User.findOne({
            where: { id: profile.id, provider: 'google' },
          });
          if (exUser){
            done(null, exUser);
          }else{
            const newUser = await User.create({
              email: profile?.email[0].value,
              nick: profile.displayName,
              id: profile.id,
              provider: 'google',
            });
            done(null, newUser);
          }
        }catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};