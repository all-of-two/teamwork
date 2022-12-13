const { Posts, Likes, Users } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

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

  getOnePost = async () => {
    try {
      const posts = await Posts.findOne({
        where: {
          [Op.or]: [{ postId: Id }],
        },
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
      });

      if (posts.length === 0) {
        throw new ValidationError('게시글이 존재하지 않습니다.');
      } else {
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
              content: posts.content,
              like: count,
              createdAt: posts.createdAt,
              updatedAt: posts.updatedAt,
            };
          })
        );

        res.json({
          data: results,
        });
      }

      return results;
    } catch (error) {
      throw error;
    }
  };

  createPost = async ({ postId, userId, title, content }) => {
    const resultSchema = postSchema.validate(req.body);
    if (resultSchema.error) {
      throw new ValidationError('데이터 형식이 올바르지 않습니다.');
    }

    const post = await posts.create({
      postId,
      userId,
      title,
      content,
    });

    return posts;
  };

  modifyPost = async ({ postId, userId, title, content }) => {
    const post = await posts.put({
      postId,
      userId,
      title,
      content,
    });

    return posts;
  };

  deletePost = async ({ postId, userId, title, content }) => {
    const post = await posts.delete({
      include: [postId, userId, title, content],
    });

    return posts;
  };
}

module.exports = PostsRepository;
