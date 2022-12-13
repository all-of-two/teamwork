const likesService = require('../services/likes');
const { InvalidParamsError } = require('../exceptions/index');

class likesController {
  constructor() {
    this.likesService = new likesService();
  }

  getAllLike = async (req, res, next) => {
    try {
      const likes =
        await this.likesService.getAllLike({});

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

      const like =
        await this.likesService.createLike({
          likeId, postId, userId});

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

      const like =
        await this.likesService.deleteLike({
          likeId, postId, userId
        });

      res.json({ result: like });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };
}

module.exports = likesController;
