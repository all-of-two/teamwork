const { Posts, Likes, Users } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

const { Op } = require('sequelize');

class PostsRepository extends Posts {
  constructor() {
    super();
  }

  getAllPost = async () => {
    // let { Id } = req.params;

    try {
      const posts = await Posts.findAll({
        include: [
          {
            model: Users,
            attributes: ['nickname'],
          },
        ],
        order: [['updatedAt', 'desc']],
      });

      if (posts.length === 0) {
        throw new ValidationError('게시글이 존재하지 않습니다.');
      }

      const results = await Promise.all(
        posts.map(async (posts) => {
          const count = await Likes.count({
            where: {
              [Op.or]: [{ postId: posts.postId }],
            },
          });
          return {
            postId: posts.postId,
            userId: posts.userId,
            nickname: posts.User.nickname,
            title: posts.title,
            like: count,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
          };
        })
      );

      return results;
    } catch (error) {
      throw error;
    }
  };

  getOnePost = async ({ postId }) => {
    try {
      const posts = await Posts.findByPk(postId);

      if (!posts) throw new ValidationError('게시글이 존재하지 않습니다.');

      return posts;
    } catch (error) {
      throw error;
    }
  };

  createPost = async ({ nickname, userId, title, content }) => {
    // const resultSchema = postSchema.validate(req.body);
    // if (resultSchema.error) {
    //   throw new ValidationError('데이터 형식이 올바르지 않습니다.');
    // }

    try {
      const post = await Posts.create({
        nickname,
        userId,
        title,
        content,
      });

      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  modifyPost = async ({ postId, title, content }) => {
    try {
      const post = await Posts.update(
        {
          title,
          content,
        },
        { where: { postId } }
      );
      return post;
    } catch (error) {
      throw error;
    }
  };

  deletePost = async ({ postId }) => {
    try {
      const post = await Posts.destroy({
        where: { postId },
      });

      return post;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PostsRepository;
