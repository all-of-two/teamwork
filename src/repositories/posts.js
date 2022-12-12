const { postId, userId, content, title } = require('../models');
  
  class postsRepository extends posts {constructor() {super();}
  
    getAllPost = async () => {
      const posts = await posts.findAll({
        include: [postId, userId, title],
      });
  
      return posts;
    };
  
    createPost = async ({
      postId,
      userId,
      title,
      content,
    }) => {
      const post = await posts.create({
        postId,
        userId,
        title,
        content,
      });
  
      return post;
    };
  }
  
  module.exports = postsRepository;
  