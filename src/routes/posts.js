const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getAllPost); // 게시글 목록 조회
router.get('/:postId', postsController.getOnePost); // 게시글 상세 조회
router.post('/', authMiddleware, postsController.createPost); // 게시글 작성
router.put('/:postId', authMiddleware, postsController.modifyPost); // 게시글 수정
router.delete('/:postId', authMiddleware, postsController.deletePost); // 게시글 삭제

module.exports = router;
