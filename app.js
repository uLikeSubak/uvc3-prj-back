const express = require('express');
const session = require('express-session');
// const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
// const passportConfig = require('./passport')
const { sequelize } = require('./models');

const app = express();

const authRouter = require('./routes/auth.js')



dotenv.config();
// passportConfig()

// .env에 포트 설정
app.set('port', process.env.PORT) 

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')))

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));


  sequelize.sync({ force: false })
  .then(() => {
      console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
      console.log(err)
  }) 

// app.use(passport.initialize());
// app.use(passport.session());  

app.use('/auth', authRouter);



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });