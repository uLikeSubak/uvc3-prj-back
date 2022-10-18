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


// 화원가입 api
router.post('/signUp', async (req, res) => {
  const { name, email, id, password, birthdate, gender, photoUrl, profileMessage } = req.body;
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
      provider,
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


// 네이버 로그인 api
router.post('/', async function (req, res, next) {

  var code = req.body.code;
  var state = req.body.state;


  if (!code || !state) {
    res.send(JSON.stringify({ result: 'false' }));
  } else {
    try {
      var client_id = 'XidCe260VgSnQTw99lYJ';
      var client_secret = 'AaFOJIiWpk';
      var api_url = null;
      api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&code=' + code + '&state=' + state;

      var request = require('request');

      var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
      };

      //토큰검사 request
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {



          const obj = JSON.parse(body);//body가 String이기 때문에 json으로 파싱
          //값이 궁금하면 body console 찍어보기


          var api_url1 = 'https://openapi.naver.com/v1/nid/me';
          var token = obj.access_token;
          var header = "Bearer " + token; // Bearer 다음에 공백 추가
          var options1 = {
            url: api_url1,
            headers: { 'Authorization': header }
          };

          var request1 = require('request');

          //토큰을 이용해 이용자 정보 가져오기 request
          request1.get(options1, async function (error, response, body1) {
            if (!error && response.statusCode == 200) {


              const result = JSON.parse(body1);
              console.log(typeof result.response)

              if (result.message == 'success') {
                //success면 이용자 정보 가져오기 성공
                var email = result.response.email;


              } else {
                //result fail
                res.send(JSON.stringify({ result: `error` }));
              }

            } else {
              console.log('error');
              if (response != null) {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
              }
            }
          });

        } else {
          res.send(JSON.stringify({ result: `error` }));
        }
      });

    } catch (err) {
      res.send(JSON.stringify({ result: "error" }));
      console.log("Query Error : " + err);
      throw err;
    }
  }

});








/**
 router.post('/signIn-Naver', async (req, res) {
  const code = req.body.code;
  const state = req.body.state;
  api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
       + 'XidCe260VgSnQTw99lYJ' + '&client_secret=' + 'AaFOJIiWpk' + '&code=' + code + '&state=' + state;
  const request = rqeuire('request');
  const options = {
    url: api_url,
    headers: {'X-Naver-Client-Id':XidCe260VgSnQTw99lYJ, 'X-Naver-Client-Secret':AaFOJIiWpk};
    request.get(options, function {error, response, body} {
      if(!error && response.statusCode == 200) {
        res.writeHeader(200, {'Content-Type':: 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
 })
 * 
 
 router.post('/signIn-NaverMember', async (req, res) => {
  const api_url = "https://openapi.naver.com/v1/nid/me";
  const request = require('request');
  const token - req.body.token;
  const header = "Bearer " + token;
  const options = {
    url: api_url,
    headers: { 'Authorization': header }
  };
  try {
    request.get(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
  } catch (Error)
      if(response != null) {
        res.status(response.statusCode).end();
        console.log('error =' + response.statusCode);
  }
 })
 */

// const naverLogin = new naver.LoginWithNaverId(
//   {
//     clientId: "XidCe260VgSnQTw99lYJ",
//     callbackUrl: "AaFOJIiWpk",
//   }
// );
// naverLogin.init(); // 로그인 설정




module.exports = router;