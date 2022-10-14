// express 선언
const express = require('express');

// jwt 선언
const { verifyToken } = require('./middlewares')


// router 선언
const router = express.Router();

// 모델 선언
const User = require('../models/user');
const { Router } = require('express');


// 내 정보 조회

router.post('/my', verifyToken, async(req, res)=>{
  try {
    console.log("요청자 아이디:",req.decoded.id)
    const myProfile = await User.findOne({where:{id: req.decoded.id}});
    console.log("myProfile:",myProfile);
    if(myProfile){ 
      return res.status(200).json({
        data: myProfile,
      });
    }else{
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
})
  
// 타 회원 정보 조회 

router.get('/:id', verifyToken, async(req, res)=>{
  try {
    const userProfile = await User.findOne({where:{id: req.params.id}})
    if(userProfile){
      return res.status(200).json({
        success: true,
        data: userProfile,
      });
    }else{
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 회원 정보 수정

router.patch('/my', verifyToken, async(req, res)=>{
  const { photoUrl, profileMessage} = req.body;
  console.log(req.body);
  console.log(profileMessage);
  try {
    await User.update(
      {
      profileMessage: profileMessage,
      photoUrl: photoUrl,
      },
      {
        where:{
          id: req.decoded.id
        }
      },
    )
    console.log("then here?")
    return res.sendStatus(200);
  }catch (error) {
    return res.sendStatus(400);
  }
})





// 회원 정보 삭제

router.delete('/:id', verifyToken, async(req, res)=>{
  try {
    await User.destroy({where:{id: req.decoded.id}})
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
})

module.exports = router;
