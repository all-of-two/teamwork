const PostsService = require('../services/posts.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

const Joi = require('joi');
const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  getAllPost = async (req, res, next) => {
    try {
      const posts = await this.postsService.getAllPost({});
      res.status(200).json({ data: posts });
    } catch (error) {
      next(error);
    }
  };

  getOnePost = async (req, res, next) => {
    try {
      const posts = await this.postsService.getOnePost({});
      res.status(200).json({ result: posts });
    } catch (error) {
      next(error);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const resultSchema = postSchema.validate(req.body);
      const { title, content } = resultSchema.value;
      const { userId } = res.locals.user;

      if (!userId || !title || !content) {
        throw new InvalidParamsError('게시글을 등록할 수 없습니다.');
      }

      const RE_TITLE = /^[a-zA-Z0-9\s\S]{1,40}$/; //게시글 제목 정규 표현식
      const RE_HTML_ERROR = /<[\s\S]*?>/; // 게시글 HTML 에러 정규 표현식
      const RE_CONTENT = /^[\s\S]{1,3000}$/; // 게시글 내용 정규 표현식

      if (resultSchema.error) {
        throw new ValidationError('데이터 형식이 올바르지 않습니다.');
      }

      if (
        !isRegexValidation(title, RE_TITLE) ||
        isRegexValidation(title, RE_HTML_ERROR)
      ) {
        throw new ValidationError('게시글 제목의 형식이 올바르지 않습니다.');
      }

      if (!isRegexValidation(content, RE_CONTENT)) {
        throw new ValidationError('게시글 내용의 형식이 올바르지 않습니다.');
      }

      const post = await this.postsService.createPost({
        userId,
        title,
        content,
      });
      res.status(200).json({ result: post });
    } catch (error) {
      next(error);
    }
  };

  modifyPost = async (req, res, next) => {
    try {
      const resultSchema = postSchema.validate(req.body);
      const { title, content } = resultSchema.value;
      const { userId } = res.locals.user;
      const { postId } = req.params;

      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError('게시글을 수정할 수 없습니다.');
      }

      const post = await this.postsService.modifyPost({
        postId,
        userId,
        title,
        content,
      });
      res.status(200).json({ result: post });
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const resultSchema = postSchema.validate(req.body);
      const { title, content } = resultSchema.value;
      const { userId } = res.locals.user;
      const { postId } = req.params;

      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError('게시글을 삭제할 수 없습니다.');
      }

      const post = await this.postsService.deletePost({
        postId,
        userId,
        title,
        content,
      });
      res.status(200).json({ result: post });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostsController;
