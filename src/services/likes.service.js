const LikesRepository = require('../repositories/likes.repository');
const { ValidationError } = require('../exceptions/index.exception');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  getAllLike = async ({}) => {
    try {
      const likes = await this.likesRepository.getAllLike({});

      return { likes };
    } catch (error) {
      throw error;
    }
  };

  createLike = async ({ userId, postId }) => {
    try {
      const isExistLike = await this.likesRepository.findLike({
        postId,
        userId,
      });

      if (isExistLike) {
        throw new ValidationError('이미 좋아요 등록된 게시글입니다.');
      }

      const like = await this.likesRepository.createLike({
        postId,
        userId,
      });

      return { like };
    } catch (error) {
      throw error;
    }
  };

  deleteLike = async ({ likeId, postId, userId }) => {
    try {
      if (!likeId || !postId || !userId) {
        throw new InvalidParamsError('좋아요를 취소할 수 없습니다.');
      }

      const isExistLike = await this.likesRepository.findLike({
        likeId,
        postId,
        userId,
      });

      if (!isExistLike) {
        throw new ValidationError('해당 게시글은 좋아요가 없습니다.');
      }

      const deleteCount = await this.likesRepository.getOneLike({
        where: { postId, userId },
      });

      if (deleteCount < 1) {
        throw new InvalidParamsError(
          '게시글을 정상적으로 삭제되지 않았습니다.'
        );
      }

      const like = await this.likesRepository.deleteLike({
        likeId,
        postId,
        userId,
      });

      res.json({ like });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = LikesService;
