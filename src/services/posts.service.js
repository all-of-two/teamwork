const postsService = require('./posts.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class postsController {
  constructor() {
    this.postsService = new postsService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/

  // 모든 게시글 조회
  getAllPost = async (req, res, next) => {
    try {
      const posts = await this.postsService.getAllPost({});

      const likes = await Likes.findAll();

      const postsQuery = `
                SELECT p.postId, u.userId, u.nickname, p.title, p.createdAt, p.updatedAt
                FROM Posts AS p
                JOIN Users AS u
                ON p.userId = u.userId
                ORDER BY p.postId DESC`;

      let post = await sequelize.query(postsQuery, {
        type: Sequelize.QueryTypes.SELECT,
      });
      post = posts.map((posts) => {
        return {
          ...posts,
          likes: likes.filter((like) => like.postId === posts.postId).length,
        };
      });
      posts.sort((a, b) => b.createdAt - a.createdAt);
      return res.status(200).json({ data: posts });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };

  // 게시글 상세 조회
  getOnePost = async (req, res, next) => {
    try {
      const posts = await this.postsService.getOnePost({});

      const { postId } = req.params;

      const likes = await Likes.findAll({
        where: {
          [Op.and]: [{ postId }],
        },
      });

      const postQuery = `
                SELECT p.postId, u.userId, u.nickname, p.title, p.content, p.createdAt, p.updatedAt
                FROM Posts AS p
                JOIN Users AS u
                ON p.userId = u.userId
                WHERE p.postId = ${postId}
                ORDER BY p.postId DESC
                LIMIT 1`;

      const post = await sequelize
        .query(postQuery, {
          type: Sequelize.QueryTypes.SELECT,
        })
        .then((posts) => {
          const post = posts[0];

          return {
            ...post,
            likes: likes.filter((like) => like.postId === post.postId).length,
          };
        });

      const comments = await Comments.findAll({
        where: {
          [Op.and]: [{ postId }],
        },
      });
      return res.status(200).json({
        data: {
          ...post,
          comments,
        },
      });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  createPost = async (req, res, next) => {
    try {
      const { postId } = req.body;
      const { userId } = res.locals.user;
      const { title, content } = resultSchema.value;

      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError();
      }

      if (
        !isRegexValidation(title, RE_TITLE) ||
        isRegexValidation(title, RE_HTML_ERROR)
      ) {
        return res.status(412).json({
          errorMessage: '게시글 제목의 형식이 일치하지 않습니다.',
        });
      }
      if (!isRegexValidation(content, RE_CONTENT)) {
        return res.status(412).json({
          errorMessage: '게시글 내용의 형식이 일치하지 않습니다.',
        });
      }

      const post = await this.postsService.createPost({
        postId,
        userId,
        title,
        content,
      });

      res.json({ result: post });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };

  modifyPost = async (req, res, next) => {
    try {
      const { postId, userId, title, content } = req.body;

      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError();
      }

      const post = await this.postsService.modifyPost({
        postId,
        userId,
        title,
        content,
      });

      res.json({ result: post });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId, userId, title, content } = req.body;

      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError();
      }

      const post = await this.postsService.deletePost({
        postId,
        userId,
        title,
        content,
      });

      res.json({ result: post });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };
}

module.exports = postsController;
