// express 선언
const express = require('express');
const multer = require('multer');
const path = require('path');

// jwt 선언
const { verifyToken } = require('./middlewares')


// router 선언
const router = express.Router();

// 모델 선언
const User = require('../models/user');
const AttendList = require('../models/attendList')
const Post = require('../models/post')
const { Router } = require('express');



//게시글 기록(history)

router.get('/myattend', verifyToken, async(req, res)=>{
  console.log(req.decoded.id);
  try {
    console.log(1)
    //attend list에서 아이디를 찾음
    const myPostList = await AttendList.findAll({
      where: {
        UserId: req.decoded.id,
      }
    })
    console.log(myPostList);
    console.log(2)
    const myHistoryList=[];
    //post에서 일치하는 아이디를 찾음
    for(let i=0;i<myPostList.length;i++){
      myHistoryList[i] = await Post.findOne({
        where: {        
          id: myPostList[i].PostId,
        }
      })
    }
    console.log(3)
    console.log(4,myHistoryList);
    return res.status(200).json({
      myHistoryList,
    })
  } catch (error) {
    return res.sendStatus(500)
  }
})




// 내 정보 조회

router.post('/my', verifyToken, async (req, res) => {
  try {
    console.log("요청자 아이디:", req.decoded.id)
    const myProfile = await User.findOne({ where: { id: req.decoded.id } });
    console.log("myProfile:", myProfile);
    if (myProfile) {
      return res.status(200).json({
        data: myProfile,
      });
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 타 회원 정보 조회 

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const userProfile = await User.findOne({ where: { id: req.params.id } })
    if (userProfile) {
      return res.status(200).json({
        success: true,
        data: userProfile,
      });
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 회원 정보 수정

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
});




router.patch('/my', verifyToken, upload.single('img'), async (req, res) => {
  const { profileMessage, photoUrl } = req.body;
  console.log(2, photoUrl);
  console.log(3, profileMessage);
  try {
    if(photoUrl || profileMessage){
      await User.update(
      {
        profileMessage: profileMessage,
        photoUrl,
      },
      {
        where:{
          id: req.decoded.id
        }
      },
      )
    }
    else{
    await User.update(
      {
        profileMessage: profileMessage,
        photoUrl: `/img/${req.file.filename}` || photoUrl ,
      },
      {
        where: {
          id: req.decoded.id
        }
      },
     )
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
})





// 회원 정보 삭제

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await User.destroy({ where: { id: req.decoded.id } })
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
})



module.exports = router;
