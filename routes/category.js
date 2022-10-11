const express = require('express');

const router = express.Router();

const { verifyToken } = require('./middlewares')

const { Category } = require('../models')


// 카테고리 리스트 조회

router.get('/', verifyToken, async(req, res)=>{
  try {
    const categoryTitles = await Category.findAll({})
    console.log(categoryTitles)
    return res.status(200).json({
      success: true,
      data: categoryTitles,
    })
  } catch (error) {
    return res.sendStatus(404);
  }
})

// 카테고리 추가 (관리자만 가능)

router.post('/', verifyToken, async(req, res)=>{
  const { categoryTitle } = req.body;
  try {
    await Category.create({
      categoryTitle,
    })
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(404);
  }
})




// 카테고리 삭제 

router.delete('/', verifyToken, async(req, res)=>{
  const { categoryTitle } = req.body;
  try {
    await Category.destroy({
      where:{categoryTitle}
    })
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
})



// 카테고리 수정 

router.patch('/', verifyToken, async(req, res)=>{
  const { oldCategoryTitle, newCategoryTitle } = req.body;
  try {
    await category.update({
      categoryTitle : newCategoryTitle,
    },
    {
      where: {categoryTitle: oldCategoryTitle}
    })
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
})

module.exports = router;