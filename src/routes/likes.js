const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.get('/', authMiddleware, likesController.getAllLike); // 좋아요 리스트

// router.get('/:postId', authMiddleware, likesController.getAllLike); // 좋아요 리스트

router.put('/', authMiddleware, likesController.createLike); // 좋아요 등록

// router.put('/:postId', authMiddleware, likesController.createLike); // 좋아요 등록

router.delete('/:likeId', authMiddleware, likesController.deleteLike); // 좋아요 삭제

// router.delete('/:postId/:likeId', authMiddleware, likesController.deleteLike); // 좋아요 삭제

module.exports = router;
