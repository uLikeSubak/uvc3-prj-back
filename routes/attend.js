// express 선언
const express = require('express');

// router 선언
const router = express.Router();

// 모델 선언
const { AttendList, Post } = require('../models');
const { count } = require('../models/post');

// 토큰 선언
const { verifyToken } = require('./middlewares');


////// 신청 확정자 (status:TRUE - accepted)
// GET으로 전체 확정자 목록 조회
router.get('/:postId/acceptlist', verifyToken, async (req, res) => {
  try {
    const acceptlist = await AttendList.findAll({
      where: { PostId: req.params.postId, status: true },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      acceptlist,
    })
  } catch (error) {
    return res.sendStatus(500);
  }
});

// POST으로 신청자 목록에 신청
router.post('/:postId/acceptlist', verifyToken, async (req, res) => {
  try {
    await AttendList.create({
      content: req.body.content,
      status: true,
      UserId: req.decoded.id,
      PostId: req.params.postId,
    });
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
});

// PATCH로 대기자 목록에서 확정자로 변경
// router.patch('/:postId/acceptlist/:id', verifyToken, async (req, res) => {
//   try {
//     await AttendList.update({
//       status: true,
//     }, { where: { PostId: req.params.postId, id: req.params.id } })
//     return res.sendStatus(200);
//   } catch (error) {
//     return res.sendStatus(500);
//   }
// });

// DELETE로 확정자 목록에서 삭제
router.delete('/:postId/acceptlist/:id', verifyToken, async (req, res) => {
  try {
    await AttendList.destroy({ where: { PostId: req.params.postId, id: req.params.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
});



////// 신청 대기자 (status: FALSE - pending)
// GET으로 전체 신청 대기자 목록 조회
// router.get('/:postId/waitlist', verifyToken, async (req, res) => {
//   try {
//     const waitlist = await AttendList.findAll({
//       where: { PostId: req.params.postId, status: false },
//       order: [['createdAt', 'DESC']],
//     });
//     return res.status(200).json({
//       waitlist
//     })
//   } catch (error) {
//     return res.sendStatus(500);
//   };
// });

// POST으로 대기자 목록에 신청
// router.post('/:postId/waitlist', verifyToken, async (req, res) => {
//   try {
//     await AttendList.create({
//       content: req.body.content,
//       status: false,
//       UserId: req.decoded.id,
//       PostId: req.params.postId,
//     });
//     return res.sendStatus(201);
//   } catch (error) {
//     return res.sendStatus(500);
//   }
// });

// DELETE으로 대기자 목록에서 삭제
// router.delete('/:postId/waitlist/:id', verifyToken, async (req, res) => {
//   try {
//     await AttendList.destroy({ where: { PostId: req.params.postId, status: false, id: req.params.id } })
//     res.sendStatus(204);
//   } catch (error) {
//     return res.sendStatus(500);
//   }
// });



module.exports = router;