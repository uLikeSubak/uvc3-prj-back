const express = require('express');
// const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const passportConfig = require('./passport')
const { sequelize } = require('./models');
const cors = require('cors');
const corsConfig = require('./config/corsConfig');
// const corsConfig = require('./config/corsConfig.json');
// const logger = require('./lib/logger');
const NaverStrategy = require('./passport/naverStrategy').Strategy

const app = express();
const authRouter = require('./routes/auth.js')
const postRouter = require('./routes/post.js')
const profileRouter = require('./routes/profile.js')
const commentRouter = require('./routes/comment.js')
const categoryRouter = require('./routes/category.js')
const attendRouter = require('./routes/attend.js')
const friendRouter = require('./routes/friend.js')


dotenv.config();
passportConfig()

// .env에 포트 설정
app.set('port', process.env.PORT)
app.use(cors(corsConfig)); // cors설정
app.use(cookieParser());

//cors설정
app.use(morgan('dev'));

// passport 설정
app.use(passport.initialize());
// app.use(passport.session());
// app.use(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads/img', express.static(path.join(__dirname, 'uploads')))


// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   }));


sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(passport.initialize());
app.use(passport.session());  

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/profile', profileRouter);
app.use('/comment', commentRouter);
app.use('/category', categoryRouter);
app.use('/attend', attendRouter);
app.use('/friend', friendRouter);



app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});