// express 선언
const express = require('express');
// const { verify } = require('jsonwebtoken');

// router 선언
const router = express.Router();

// 모델 선언
const { Post, User } = require('../models');

// 토큰 선언
const { verifyToken } = require('./middlewares');


// GET으로 전체 게시글 조회
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
    });
    // res.json({ posts });
    return res.status(200).json({
      posts
    });
  } catch (error) {
    return res.sendStatus(500);
  };
});

// POST으로 게시글 작성
router.post('/', verifyToken, async (req, res) => {
  console.log('test')
  console.log(req.decoded.id)
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      region: req.body.region,
      address: req.body.address,
      cost: req.body.cost,
      capacity: req.body.capacity,
      date: req.body.date,
      time: req.body.time,
      visibility: req.body.visibility,
      UserId: req.decoded.id,
    });
    return res.sendStatus(201)
  } catch (error) {
    return res.sendStatus(500)
  }
});


// PATCH로 게시글 수정 (단, 유저가 쓴 것만)
// router의 id는 post의 id
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    await Post.update({
      title: req.body.title,
      content: req.body.content,
      region: req.body.region,
      address: req.body.address,
      cost: req.body.cost,
      capacity: req.body.capacity,
      date: req.body.date,
      visibility: req.body.visibility,
    }, { where: { id: req.params.id, UserId: req.decoded.id } })
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
})


// DELETE으로 게시글 삭제 (단, 유저가 쓴 것만)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
})

module.exports = router;