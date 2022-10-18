// express 선언
const express = require('express');

// jwt 선언
const jwt = require('jsonwebtoken');

// 비밀번호 암호화 모듈 선언 
const bcrypt = require('bcrypt');

// router 선언
const router = express.Router();

// 모델 선언
const User = require('../models/user');
const { verifyToken } = require('./middlewares');
const passport = require('passport');

// 화원가입 api
router.post('/signUp', async (req, res) => {
  const { name, email, id, nick, password, birthdate, gender, photoUrl, profileMessage } = req.body;
  // console.log(req.body);
  try {
    console.log(req.body);
    // 비밀번호 암호화 
    const hash = await bcrypt.hash(password, 12);
    // 간단하게 회원가입 구현이라 email, authCode, status는 제외 했습니다.
    await User.create({
      name,
      id,
      password: hash,
      email,
      birthdate,
      gender,
      name,
      nick,
      photoUrl,
      profileMessage,
    });
    // 유저정보가 성공적으로 만들어졌다면 201(Created)
    return res.sendStatus(201);
  } catch (error) {
    // 유저 정보 생성에 필요한 정보가 제대로 오지 않았다면 400(Bad Request)
    // console.log('what is wrong');
    return res.sendStatus(400);
  }
})


// 회원가입 시 이메일 중복확인
// 라우터 주소 형식을 어떤 식으로 할 지 얘기를 한 번 해봐야할 거 같습니다.
router.get('/emailChk/:id', async (req, res) => {
  try {
    const isDupEmail = await User.findOne({ where: { email: req.params.id } });
    // isDupEmail : 입력한 이메일이 db에 있으면 값이 담긴다.
    if (isDupEmail) {
      // 중복된 이메일이 있으면 400(Bad Request)
      return res.sendStatus(400);
    } else {
      // 중복된 이메일이 없다면 200(Request Success)
      return res.sendStatus(200);
    }
  } catch (error) {
    // 에러는 전부 404 (Not Found) 처리를 할까요?
    return res.sendStatus(404);
  }
})



// 회원가입 시 닉네임 겸 ID 중복확인
router.get('/userIdChk/:id', async (req, res) => {
  try {
    const isDupUserId = await User.findOne({ where: { id: req.params.id } });
    // isDupUserId : 입력한 닉네임(Id)이 db에 있으면 값이 담긴다.
    if (isDupUserId) {
      // 중복된 닉네임(ID)이 있으면 400(Bad Request)
      return res.sendStatus(400);
    } else {
      // 중복된 닉네임(ID)이 없다면 200(Request Success)
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
})


// 로컬 로그인 api
router.post('/signIn', async (req, res) => {
  const { id, password } = req.body;
  console.log(id, password);
  // id = id.toLowerCase();
  const validId = await User.findOne({ where: { id } });
  try {
    // 클라이언트가 입력한 ID의 유효성 체크
    if (!validId) {
      return res.sendStatus(404);
    }
    // 클라이언트가 입력한 pw와 db에 저장된 암호화된 비밀번호를 비교 후 일치하면 값이 담김.
    const validPassword = await bcrypt.compare(password, validId.password)
    if (validPassword) {
      const token = jwt.sign({
        id: validId.id,
      }, process.env.JWT_SECRET, {
        expiresIn: '30000m', // 테스트용이여서 일단 길게 했습니다. 
        issuer: 'todaymate',
      });
      res.cookie('token', token, {
        httpOnly: true
      })
      console.log(token);
      return res.status(200).json({
        message: '토큰이 발급되었습니다',
        token,
        id,
      });
    } else {
      // 비밀번호 불일치 400(Bad Request)
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 로그아웃 api
router.get('/signOut', verifyToken, async (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    })
    res.sendStatus(200);
  } catch (Error) {
    return res.sendStatus(404);
  }
})

// 구글 로그인 api
router.get('/google', passsport.authenticate('google', { sccope: ['profile','email']}));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/'}),
  (req, res) => {
    res.redirect('/');
  }
  )


// 네이버로 로그인
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

//? 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 아래 라우터로 오게 한다
router.get(
  'naver/callback',
  //? passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 db를 비교해서 회원가입시키거나 로그인 처리하게 한다
  passport.authenticate('naver', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  },
);








module.exports = router;