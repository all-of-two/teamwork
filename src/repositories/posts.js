const { postId, userId, content, title } = require('../models');

class postsRepository extends posts {
  constructor() {
    super();
  }

  getAllPost = async () => {
    const posts = await posts.findAll({
      include: [postId, userId, title],
    });

    return posts;
  };

  getOnePost = async () => {
    const posts = await posts.findAll({
      include: [postId, userId, title, content],
    });

    return posts;
  };

  createPost = async ({ postId, userId, title, content }) => {

    const resultSchema = postSchema.validate(req.body);
    if (resultSchema.error) {
      return res.status(412).json({
        errorMessage: '데이터 형식이 올바르지 않습니다.',
      });
    }

    const post = await posts.create({
      postId,
      userId,
      title,
      content,
    });

    return post;
  };

  modifyPost = async ({ postId, userId, title, content }) => {
    const post = await posts.put({
      postId,
      userId,
      title,
      content,
    });

    return post;
  };
}

deletePost = async ({ postId, userId, title, content }) => {
  const post = await posts.delete({
    include: [postId, userId, title, content],
  });

  return post;
};

module.exports = postsRepository;
