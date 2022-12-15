const LikesRepository = require('../repositories/likes.repository');
const { ValidationError } = require('../exceptions/index.exception');

class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository();
  }

  getAllLike = async ({}) => {
    const likes = await this.likesRepository.getAllLike({});

    return likes;
  };

  createLike = async ({ likeId, postId, userId }) => {
    const isExistLike = await this.likesRepository.findLike({
      likeId,
      postId,
      userId,
    });

    if (isExistLike) {
      throw new ValidationError('이미 좋아요 등록된 게시글입니다.');
    }

    const like = await this.likesRepository.createLike({
      likeId,
      postId,
      userId,
    });

    return like;
  };

  deleteLike = async ({ likeId, postId, userId }) => {
    const isExistLike = await this.likesRepository.findLike({
      likeId,
      postId,
      userId,
    });

    if (!isExistLike) {
      throw new ValidationError(
        '해당 게시글의 좋아요가 등록되어 있지 않습니다.'
      );
    }

    const like = await this.likesRepository.deleteLike({
      likeId,
      postId,
      userId,
    });

    return like;
  };
}

module.exports = LikesService;
