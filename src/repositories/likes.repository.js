const { pPosts, Likes, Users } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

class LikesRepository extends Likes {
  constructor() {
    super();
  }

  getAllLike = async () => {
    try {
      const likes = await likes.findAll({
        where: {
          [Op.or]: [{ userId: res.locals.user.userId }],
        },
        include: [Posts, User],
      });

      const result = await Promise.all(
        likes.map(async (posts) => {
          const count = await Likes.count({
            where: {
              [Op.or]: [{ postId: posts.postId }],
            },
          });

          return {
            postId: posts.postId,
            userId: posts.userId,
            nickname: posts.User.nickname,
            title: posts.Post.title,
            createdAt: posts.createdAt,
            like: count,
          };
        })
      );
      data = result.sort(function (a, b) {
        return b.like - a.like;
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  createLike = async ({ userId, postId }) => {
    try {
      const like = await likes.create({
        userId,
        postId,
      });

      return like;
    } catch (error) {
      throw error;
    }
  };

  deleteLike = async ({ userId, postId }) => {
    try {
      const like = await likes.destroy({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
      });

      return like;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = LikesRepository;
