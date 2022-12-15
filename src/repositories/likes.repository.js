const { likeId, postId, userId ,Likes} = require('../models');
const { Op } = require('sequelize');

class LikesRepository extends Likes {
  constructor() {
    super();
  }

  getAllLike = async ({}) => {
    const likes = await likes.findAll({
      include: [users, posts],
    });

    return likes;
  };

  findLike = async ({ userId, postId }) => {
    const like = await likes.findOne({
      where: {
        [Op.and]: [{ userId }, { postId }],
      },
    });

    return like;
  };

  createLike = async ({ userId, postId }) => {
    const like = await likes.create({
      userId, postId,
    });

    return like;
  };

  deleteLike = async ({ userId, postId }) => {
    const like = await likes.destroy({
      where: {
        [Op.and]: [{ userId }, { postId }],
      },
    });

    return like;
  };
}

module.exports = LikesRepository;
