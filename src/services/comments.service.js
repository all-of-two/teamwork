const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }

  getAllComment = async (req, res, next) => {
    const comments = await this.commentsRepository.getAllComment({});

    return comments;
  };

  createComment = async ({ postId, userId, comment }) => {
    return await this.commentsRepository.createComment({
      commentId,
      postId,
      userId,
      comment,
    });
  };
}

module.exports = CommentsService;
