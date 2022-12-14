const CommentsService = require('../services/comments.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class CommentsController {
  commentsService = new CommentsService();

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  createComment = async (req, res) => {
    try {
      let { postId } = req.params;
      const { userId } = res.locals.user;
      const { comment } = req.body;

      await this.commentService.CreateComment(postId, userId, comment);
      res.status(200).json({ message: '댓글을 생성하였습니다.' });
    } catch (err) {
      return InvalidParamsError(err, res);
    }
  };
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  getAllComment = async (req, res) => {
    try {
      const { postId } = req.params;

      const comments = await this.commentService.FindComment(postId);
      res.json({
        data: comments,
      });
    } catch (error) {
      return InvalidParamsError(err, res);
    }
  };
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  UpdateComment = async (req, res) => {
    try {
      let { commentId } = req.params;
      const { comment } = req.body;
      const { userId } = res.locals.user;
      await this.commentService.UpdateComment(commentId, comment, userId);
      return res.status(200).json({ msg: '댓글을 수정하였습니다.' });
    } catch (err) {
      if (!err) {
        InvalidParamsError('FailUpdateComment', res);
      } else {
        return InvalidParamsError(err, res);
      }
    }
  };
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  DeleteComment = async (req, res) => {
    try {
      let { commentId } = req.params;
      const { userId } = res.locals.user;

      await this.commentService.DeleteComment(commentId, userId);
      return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (err) {
      return InvalidParamsError(err, res);
    }
  };
}

module.exports = CommentsController;
