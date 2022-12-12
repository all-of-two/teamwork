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
      next(error);
    }
  };

  createLike = async (req, res, next) => {
    try {
      const { cafeUserId, cafePostId } = req.body;

      if (!cafeUserId || !cafePostId) {
        throw new InvalidParamsError();
      }

      const like =
        await this.likesService.createLike({
          cafeUserId,
          cafePostId,
        });

      res.json({ result: like });
    } catch (error) {
      next(error);
    }
  };

  deleteLike = async (req, res, next) => {
    try {
      const { cafeUserId, cafePostId } = req.body;

      if (!cafeUserId || !cafePostId) {
        throw new InvalidParamsError();
      }

      const like =
        await this.likesService.deleteLike({
          cafeUserId,
          cafePostId,
        });

      res.json({ result: like });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = likesController;
