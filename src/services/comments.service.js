const CommentsRepository = require('../repositories/comments.repository');
const { Posts, Users, Comments } = require('../models');
const { InvalidParamsError } = require('../exceptions/index.exception');


class CommentsService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }

  getAllComment = async ({postId}) => {
    try {
      const comments = await this.commentsRepository.getAllComment({postId});

      return comments;
    } catch (error) {
      throw error;
    }
  };

  createComment = async ({ postId, userId, comment }) => {
    try {
      const comments = await this.commentsRepository.createComment({
        postId,
        userId,
        comment,
      });
      return comments;
    } catch (error) {
      throw error;
    }
  };

  updateComment = async ({ commentId, comment, userId }) => {

    try{
    const changeComment = await this.commentsRepository.updateComment({commentId});
    if (changeComment == null || changeComment.length === 0) {
      throw new InvalidParamsError('댓글이 없습니다.');
    }
    if (!comment) {
      throw new InvalidParamsError('댓글이 일치하지 않습니다.');
    }
    // if (userId !== this.changeComment.userId) {
    //   throw new InvalidParamsError('아이디가 일치하지 않습니다.');
    // }
    return this.commentsRepository.updateComment({comment, commentId});
  }catch(error) {
throw error;
  };
  }

  deleteComment = async ({ commentId, comment, userId }) => {
    try{
    const delComment = await this.commentsRepository.deleteComment({commentId});
    if (delComment == null || delComment.length === 0) {
      throw new InvalidParamsError('댓글이 없습니다.');
    }
    // if (delComment.userId !== userId || userId == undefined) {
    //   throw 'FailDeleteComment';
    // }
    return this.commentsRepository.deleteComment({commentId});
  }catch (error) {
    throw error
  }
}
}
module.exports = CommentsService;
