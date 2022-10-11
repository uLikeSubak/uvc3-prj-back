// express 선언
const express = require('express');

// router 선언
const router = express.Router();

// 모델 선언
const { Comment } = require('../models');

// 토큰 선언
const { verifyToken } = require('./middlewares');

// GET으로 전체 댓글 조회
// router의 id는 게시글의 id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { PostId: req.params.id },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      comments
    });
  } catch (error) {
    return res.sendStatus(500);
  };
});

// POST으로 댓글 작성
// router의 id는 게시글의 id
router.post('/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      UserId: req.decoded.id,
      PostId: req.params.id,
    });
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
});

// PATCH로 댓글 수정 (단, 유저가 쓴 것만)
// router의 id는 댓글의 id
router.patch('/:postId/:id', verifyToken, async (req, res) => {
  try {
    await Comment.update({
      content: req.body.content,
    }, { where: { PostId: req.params.postId, id: req.params.id, UserId: req.decoded.id } })
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});


// DELETE으로 댓글 삭제 (단, 유저가 쓴 것만)
router.delete('/:postId/:id', verifyToken, async (req, res) => {
  try {
    await Comment.destroy({ where: { PostId: req.params.postId, id: req.params.id, UserId: req.decoded.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
})

module.exports = router;