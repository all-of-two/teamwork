const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Joi = require('joi');


const router = express.Router();
const postSchema = Joi.object ({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getAllPost); // 게시글 목록 조회
router.get('/:postId', postsController.getOnePost); // 게시글 상세 조회
router.post('/', postsController.createPost); // 게시글 작성
router.put('/:postId', postsController.modifyPost); // 게시글 수정
router.delete('/:postId', postsController.deletePost); // 게시글 삭제

module.exports = router;