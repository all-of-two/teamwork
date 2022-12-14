const { Comments } = require('../models');

class CommentsRepository {
  createComment = async (postId, userId, comment) => {
    return Comments.create({ postId, userId, comment });
  };

  getAllComment = async (postId) => {
    return Comments.findAll({
      where: { postId },
      raw: true,
      order: [['createdAt', 'DESC']],
    });
  };

  findOneComment = async (commentId) => {
    return Comments.findOne({
      where: { commentId },
    });
  };

  updateComment = async (comment, commentId) => {
    return Comments.update({ comment }, { where: { commentId } });
  };

  deleteComment = async (commentId) => {
    return Comments.destroy({ where: { commentId } });
  };
}

module.exports = CommentsRepository;
