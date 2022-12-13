const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Joi = require('joi');

const router = express.Router();
const likeSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.get('/', likesController.getAllLike); // 좋아요 게시글 조회
router.post('/', likesController.createLike); // 좋아요 생성
router.delete('/', likesController.deleteLike); // 좋아요 취소

module.exports = router;
