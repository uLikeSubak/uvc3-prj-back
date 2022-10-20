// express 선언
const express = require('express');
const { reset } = require('nodemon');
// const { verify } = require('jsonwebtoken');

// router 선언
const router = express.Router();

// 모델 선언
const { Post, AttendList, User } = require('../models');
const { findOne } = require('../models/user');

// 토큰 선언
const { verifyToken } = require('./middlewares');

// 식사 eat / 운동 exercise / 스터디 study / 공구 buy / 재능기부 talent

// POST으로 게시글 작성
router.post('/', verifyToken, async (req, res) => {
  console.log(req.body);
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
      CategoryId: req.body.CategoryId,
    });
    // console.log(post.id);
    const myattend = await AttendList.create({
      status: true,
      UserId: post.UserId,
      PostId: post.id,
    })
    return res.sendStatus(201)
  } catch (error) {
    return res.sendStatus(500)
  }
});


// 모든 게시글 조회
router.get('/all', verifyToken, async (req, res) => {
  try {
    const postList = await Post.findAll({
    })
    return res.status(200).json({
      data: postList,
    })
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 내가 쓴 게시글 조회
router.get('/my', verifyToken, async (req, res) => {
  try {
    const myPostList = await Post.findAll({
      where: {
        UserId: req.decoded.id,
      }
    })
    return res.status(200).json({
      myPostList,
    })
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 게시글 상세 조회
router.get('/all/:id', verifyToken, async (req, res) => {
  try {
    const postDetail = await Post.findOne({
      where: { id: req.params.id }
    })
    if (!postDetail) {
      return res.sendStatus(400);
    }
    return res.status(200).json({
      data: postDetail,
    })
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 게시글 작성자 정보 조회
// id:게시글 아이디
router.get('/:postId/writer', verifyToken, async (req, res)=>{
  console.log(1)
  try {
    console.log(2)
    const exPost = await Post.findOne({
      where:{
        id: req.params.postId
      }
    })
    console.log(3)
    console.log(exPost.UserId);
    const writerInfo = await User.findOne({
      where:{
        id: exPost.UserId,
      }
    })
    console.log(4)
    if(writerInfo){
      console.log(5)
      return res.status(200).json({
        data: writerInfo,
      })
    }else{
      console.log(6)
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
})




// // // 게시글 상세 - 카운터 추가
// router.patch('/all/:id', verifyToken, async (req, res) => {
//   try {
//     await Post.update({
//       count: count + 1,
//     }, {
//       where: { id: req.params.id }
//     })
//     console.log(count);
//     return res.sendStatus(201);
//   } catch (error) {
//     return res.sendStatus(404);
//   }
// })



// 카테고리: 식사 eat
// GET으로 eat게시글 조회
router.get('/eat', verifyToken, async (req, res) => {
  console.log('no?')
  try {
    const posts = await Post.findAll({
      where: { CategoryId: 1 },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      posts
    });
  } catch (error) {
    return res.sendStatus(500);
  };
});


// PATCH로 게시글 수정 (단, 유저가 쓴 것만)
// router의 id는 post의 id
router.patch('/all/:id', verifyToken, async (req, res) => {
  console.log(req.params.id);
  try {
    await Post.update({
      title: req.body.title,
      content: req.body.content,
      region: req.body.region,
      address: req.body.address,
      cost: req.body.cost,
      capacity: req.body.capacity,
      date: req.body.date,
      time: req.body.time,
      visibility: req.body.visibility,
    }, { where: { id: req.params.id, UserId: req.decoded.id } })
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
})

// DELETE으로 게시글 삭제 (단, 유저가 쓴 것만)
router.delete('/all/:id', verifyToken, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
})


///////////////////////////////////////////////////////////////

// 카테고리: 운동 exercise
// GET으로 exercise게시글 조회
router.get('/exercise', verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { CategoryId: '2' },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      posts
    });
  } catch (error) {
    return res.sendStatus(500);
  };
});


// 카테고리: 운동 exercise
// PATCH로 exercise게시글 수정 (단, 유저가 쓴 것만)
// router의 id는 post의 id
router.patch('/exercise/:id', verifyToken, async (req, res) => {
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

// 카테고리: 운동 exercise
// DELETE으로 exercise게시글 삭제 (단, 유저가 쓴 것만)
router.delete('/exercise/:id', verifyToken, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
})

///////////////////////////////////////////////////////////////

// 카테고리: 스터디 study
// GET으로 study게시글 조회
router.get('/study', verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { CategorId: 3 },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      posts
    });
  } catch (error) {
    return res.sendStatus(500);
  };
});


// 카테고리: 스터디 study
// PATCH로 study게시글 수정 (단, 유저가 쓴 것만)
// router의 id는 post의 id
router.patch('/study/:id', verifyToken, async (req, res) => {
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

// 카테고리: 스터디 study
// DELETE으로 study게시글 삭제 (단, 유저가 쓴 것만)
router.delete('/study/:id', verifyToken, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
})


///////////////////////////////////////////////////////////////

// 카테고리: 공구 buy
// GET으로 buy게시글 조회
router.get('/buy', verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { CategoryId: 4 },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      posts
    });
  } catch (error) {
    return res.sendStatus(500);
  };
});


// 카테고리: 공구 buy
// PATCH로 buy게시글 수정 (단, 유저가 쓴 것만)
// router의 id는 post의 id
router.patch('/buy/:id', verifyToken, async (req, res) => {
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

// 카테고리: 공구 buy
// DELETE으로 buy게시글 삭제 (단, 유저가 쓴 것만)
router.delete('/buy/:id', verifyToken, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
})


///////////////////////////////////////////////////////////////

// 카테고리: 재능기부 talent
// GET으로 talent게시글 조회
router.get('/talent', verifyToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { CategoryId: 5 },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({
      posts
    });
  } catch (error) {
    return res.sendStatus(500);
  };
});


// 카테고리: 재능기부 talent
// PATCH로 talent게시글 수정 (단, 유저가 쓴 것만)
// router의 id는 post의 id
router.patch('/talent/:id', verifyToken, async (req, res) => {
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

// 카테고리: 재능기부 talent
// DELETE으로 talent게시글 삭제 (단, 유저가 쓴 것만)
router.delete('/talent/:id', verifyToken, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id, UserId: req.decoded.id } })
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
})


module.exports = router;