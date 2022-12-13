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
    const comment = await this.commentsRepository.createComment({
      commentId,
      postId,
      userId,
      comment,
    });

    return comment;
  };
}

module.exports = CommentsService;
