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
  getAllComment = async (req, res, next) => {
    try {
      const comments = await this.commentsService.getAllComment({});

      res.json({ result: comments });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  createComment = async (req, res, next) => {
    try {
      const { postId, userId, comments } = req.body;

      if (!cafePostId || !cafeUserId || !comments) {
        throw new InvalidParamsError();
      }

      const comment = await this.commentsService.createComment({
        postId,
        userId,
        comment,
      });

      res.json({ result: comment });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CommentsController;
