const LikesService = require('../services/likes.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LikesController {
  constructor() {
    this.likesService = new LikesService();
  }

  getAllLike = async (req, res, next) => {
    try {
      const likes = await this.likesService.getAllLike({});

      res.json({ result: likes });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };

  createLike = async (req, res, next) => {
    try {
      const { likeId, postId, userId } = req.body;

      if (!likeId || !postId || !userId) {
        throw new InvalidParamsError();
      }

      const like = await this.likesService.createLike({
        cafeUserId,
        cafePostId,
      });

      res.json({ result: like });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };

  deleteLike = async (req, res, next) => {
    try {
      const { likeId, postId, userId } = req.body;

      if (!likeId || !postId || !userId) {
        throw new InvalidParamsError();
      }

      const like = await this.likesService.deleteLike({
        cafeUserId,
        cafePostId,
      });

      res.json({ result: like });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };
}

module.exports = LikesController;
