const CommentsService = require('../services/comments.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class CommentsController {
  constructor() {
    this.commentsService = new CommentsService();
  }
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, comment } = req.body;

      const comments = await this.commentsService.createComment({
        postId,
        userId,
        comment,
      });

      res.status(200).json({ message: '댓글을 생성하였습니다.' });
    } catch (error) {
      next(error);
    }
  };
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  getAllComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = req.body;

      const comments = await this.commentsService.getAllComment({ postId });
      res.json({
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  };
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  updateComment = async (req, res) => {
    try {
      let { commentId } = req.params;
      const { comment, userId } = req.body;

      await this.commentsService.updateComment({ commentId, comment, userId });
      return res.status(200).json({ msg: '댓글을 수정하였습니다.' });
    } catch (error) {
      throw error;
    }
  };
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  deleteComment = async (req, res) => {
    try {
      let { commentId } = req.params;
      const { userId } = res.locals.user;

      await this.commentsService.deleteComment({ commentId, userId });
      return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentsController;
