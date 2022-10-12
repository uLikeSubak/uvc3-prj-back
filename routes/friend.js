const express = require('express');
const router = express.Router();

const { Friend, User } = require('../models');

const { verifyToken } = require('./middlewares');


// 내 친구 목록 조회 

router.get('/list', verifyToken, async(req, res)=>{
  const friendList1 = await Friend.findAll({
    where:{
      status: true,
      reqUserId: req.decoded.id,
    }
  })
  const friendList2 = await Friend.findAll({
    where:{
      status: true,
      resUserId: req.decoded.id,
    }
  }) 
  try {
    const friendListArr = [];
    friendListArr.push(friendList1);
    friendListArr.push(friendList2);
    return res.status(200).json({
      friendListArr,
    })
  } catch (error) {
    return res.sendStatus(404);
  }
})



// 나한테 친구 요청한 사람 조회

router.get('/:id', verifyToken, async(req, res)=>{
  const friendStatusList1 = await Friend.findAll({
    where: {
      status: false,
      resUserId: req.decoded.id,
    }
  })
  try {
    return res.status(200).json({
      friendStatusList1,  
    })
  } catch (error) {
    return res.sendStatus(400);
  }
})







// 친구 추가 

router.post('/:id', verifyToken, async(req, res)=>{
  try {
    await Friend.create({
      reqUserId: req.decoded.id,
      resUserId: req.params.id,
      status: false,
    })
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
})



// 친구 수락

router.patch('/:id', verifyToken, async(req, res)=>{
  try {
    await Friend.update({
      status: true,
    },
    {
      where:{
        resUserId: req.decoded.id,
      }
    },
    )
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
})

// 친구 삭제

router.delete('/:id', verifyToken, async(req, res)=>{
  try {
    await Friend.destroy({
      where:{
        reqUserId: req.decoded.id,
        resUserId: req.params.id,
      }
    })
    await Friend.destroy({
      where:{
        reqUserId: req.params.id,
        resUserID: req.decoded.id,
      }
    })
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
})

module.exports = router;