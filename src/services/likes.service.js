const LikesRepository = require('../repositories/likes.repository');
const { ValidationError } = require('../exceptions/index.exception');

class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  // 모든 좋아요 조회
  getAllLike = async ({}) => {
    try {
      const like = await this.likesRepository.getAllLike({});
      return like;
    } catch (error) {
      throw error;
    }
  };

  // 좋아요 등록
  createLike = async ({postId, userId}) => {

try {
      // const isExistLike = await this.likesRepository.getAllLike({
      //   postId,
      //   userId
      // });

      // if (isExistLike) {
      //   throw new ValidationError('이미 좋아요 등록된 게시글입니다.');
      // }

      const like = await this.likesRepository.createLike({
        postId,
        userId,
      });

      return like;
    } catch (error) {
      throw error;
    }
  };

  // 좋아요 삭제
  deleteLike = async ({userId, postId}) => {

    try {
    //   const isExistLike = await this.likesRepository.getAllLike({
    //     postId,
    //     userId,
    // });

    //   if (!isExistLike) {
    //     throw new ValidationError(
    //       '해당 게시글의 좋아요가 등록되어 있지 않습니다.'
    //     );
    //   }

      const like = await this.likesRepository.deleteLike({
        postId,
        userId,
      });

      return like;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = LikesService;
