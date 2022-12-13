const LikesService = require('../services/likes.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

const Joi = require('joi');
const likeSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

class LikesController {
  constructor() {
    this.likesService = new LikesService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  getAllLike = async (req, res, next) => {
    try {
      const likes = await this.likesService.getAllLike({});
      res.status(200).json({ data: likes });
    } catch (error) {
      next(error);
    }
  };

  createLike = async (req, res, next) => {
    try {
      const resultSchema = likeSchema.validate(req.body);
      const { userId } = res.locals.user;
      const { postId } = req.params;

      if (!userId || !postId) {
        throw new InvalidParamsError('게시글을 등록할 수 없습니다.');
      }

      if (resultSchema.error) {
        throw new ValidationError('데이터 형식이 올바르지 않습니다.');
      }

      const like = await this.likesService.createLike({
        userId,
        postId,
      });

      res.json({ result: like });
    } catch (error) {
      next(error);
    }
  };

  deleteLike = async (req, res, next) => {
    try {
      const resultSchema = likeSchema.validate(req.body);
      const { likeId } = resultSchema.value;
      const { userId } = res.locals.user;
      const { postId } = req.params;

      if (!likeId || !userId || !postId) {
        throw new InvalidParamsError('좋아요를 취소할 수 없습니다.');
      }

      const like = await this.likesService.deleteLike({
        likeId,
        UserId,
        PostId,
      });

      res.json({ result: like });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LikesController;
