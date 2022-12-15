const { Posts, Likes, Users } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

const { Op } = require('sequelize');

class LikesRepository extends Likes {
  constructor() {
    super();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  // 모든 좋아요 조회
  getAllLike = async ({}) => {

     try {
      const like = await Likes.findAll({
        // where: {
        //   [Op.or]: [{ postId }]
        // },
        include: [Users, Posts],
      });
      return like;
    } catch (error) {
      throw error;
    }
  };


  findLike = async ({ userId, postId }) => {
    try {
    const like = await Likes.findOne({
      where: {
        [Op.and]: [{ userId }, { postId }],
      },
    });

    return like;
  } catch (error) {
    throw error;
  }
};


  // 좋아요 등록
  createLike = async ({userId, postId}) => {

    try {
      const like = await Likes.create({
        userId,
        postId
    });

      return like;
    } catch (error) {
      throw error;
    }
  };

  // 좋아요 삭제
  deleteLike = async ({userId, postId}) => {

      try {
      const like = await Likes.destroy({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
        userId,
        postId
      });

      return like;
    } catch (error) {
      console.log(error)
      throw error;
      
    }
  };
}

module.exports = LikesRepository;
