const postsService = require('../services/posts.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class postsController {
  constructor() {
    this.postsService = new postsService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  getAllPost = async (req, res, next) => {
    try {
      const posts = await this.postsService.getAllPost({});
      res.status(200).json({ result: posts });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error); // next ???????
    }
  };

  getOnePost = async (req, res, next) => {
    try {
      const posts = await this.postsService.getOnePost({});
      res.json({ result: posts });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { postId, userId, title, content } = req.body;
      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError("게시글을 등록할 수 없습니다.");
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
        throw new InvalidParamsError("게시글을 수정할 수 없습니다.");
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
        throw new InvalidParamsError("게시글을 삭제할 수 없습니다.");
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
