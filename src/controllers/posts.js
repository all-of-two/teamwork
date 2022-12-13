const postsService = require('../services/posts');
const { InvalidParamsError } = require('../exceptions/index');

class postsController {
  constructor() {
    this.postsService = new postsService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  getAllPost = async (req, res, next) => {
    try {
      const posts = await this.postsService.getAllPost({});

      res.json({ result: posts });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      next(error);
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

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  createPost = async (req, res, next) => {
    try {
      const { postId, userId, title, content } = req.body;
      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError();
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
