const LikesService = require('../services/likes.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LikesController {
  constructor() {
    this.likesService = new LikesService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  // 모든 좋아요 조회
  getAllLike = async (req, res, next) => {
    try {
      const likes = await this.likesService.getAllLike({});

      res.status(200).json({ data: likes });
    } catch (error) {
      next(error);
    }
  };

  // 좋아요 등록
  createLike = async (req, res, next) => {
    try {
      const { userId, postId } = req.body;

      if (!postId || !userId) {
        throw new InvalidParamsError('좋아요를 등록할 수 없습니다.');
      }

      const like = await this.likesService.createLike({
        postId,
        userId,
      });

      res.status(201).json({ message: '좋아요를 등록하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  // 좋아요 삭제
  deleteLike = async (req, res, next) => {
    try {
      const { userId, postId } = req.body;
      // const { postId } = res.locals.user;
      // const { postId } = req.params;

      if (!postId || !userId) {
        throw new InvalidParamsError('좋아요를 삭제할 수 없습니다.');
      }

      const like = await this.likesService.deleteLike({ 
        postId, 
        userId,
      });
      res.status(200).json({ message: '좋아요를 삭제하였습니다.' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LikesController;
