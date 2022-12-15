const { Comments, Posts, Users } = require('../models');

class CommentsRepository {
  createComment = async ({ postId, userId, comment }) => {
    try {
      return Comments.create({ postId, userId, comment });
    } catch (error) {
      throw error;
    }
  };

  getAllComment = async ({ postId }) => {
    try {
      return Comments.findAll({
        where: { postId },
        raw: true,
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      throw error;
    }
  };

  updateComment = async ({ comment, commentId }) => {
    try {
      return Comments.update({ comment }, { where: { commentId } });
    } catch (error) {
      throw error;
    }
  };

  deleteComment = async ({ commentId }) => {
    try {
      return Comments.destroy({ where: { commentId } });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommentsRepository;
