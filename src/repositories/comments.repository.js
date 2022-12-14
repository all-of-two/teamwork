const { Comments, Users, Posts } = require('../models');

class CommentsRepository extends Comments {
  constructor() {
    super();
  }

  getAllComment = async ({}) => {
    const comments = await Comments.findAll({
      include: [Users, Posts],
    });

    return comments;
  };

  createComment = async ({ postId, userId, comment }) => {
    const comment = await Comments.create({
      postId,
      userId,
      comment,
    });

    return comment;
  };
}

module.exports = CommentsRepository;
