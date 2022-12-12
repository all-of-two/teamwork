const { likeId, postId, userId } = require('../models');
const { Op } = require('sequelize');

class likesRepository extends likes {
  constructor() {
    super();
  }

  getAllLike = async ({}) => {
    const likes = await likes.findAll({
      include: [NaverCafeUsers, NaverCafePosts],
    });

    return likes;
  };

  findLike = async ({ cafeUserId, cafePostId }) => {
    const like = await likes.findOne({
      where: {
        [Op.and]: [{ cafeUserId }, { cafePostId }],
      },
    });

    return like;
  };

  createLike = async ({ cafeUserId, cafePostId }) => {
    const like = await likes.create({
      cafeUserId,
      cafePostId,
    });

    return like;
  };

  deleteLike = async ({ cafeUserId, cafePostId }) => {
    const like = await likes.destroy({
      where: {
        [Op.and]: [{ cafeUserId }, { cafePostId }],
      },
    });

    return like;
  };
}

module.exports = likesRepository;
