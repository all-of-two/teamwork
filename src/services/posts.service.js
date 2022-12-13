const PostsRepository = require('../repositories/posts.repository');
const { InvalidParamsError } = require('../exceptions/index.exception');

class PostsService {
  constructor() {
    this.postsRepository = new PostsRepository();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  // 모든 게시글 조회
  getAllPost = async ({}) => {
    const posts = await this.postsRepository.getAllPost({});

    try {
      return { data: posts };
    } catch (error) {
      throw error;
    }
  };

  // 게시글 상세 조회
  getOnePost = async ({}) => {
    const posts = await this.postsRepository.getOnePost({});
    try {
      return { data: posts };
    } catch (error) {
      throw error;
    }
  };

  // 게시글 작성
  createPost = async ({ postId, userId, title, content }) => {
    try {
      const RE_TITLE = /^[a-zA-Z0-9\s\S]{1,40}$/; //게시글 제목 정규 표현식
      const RE_HTML_ERROR = /<[\s\S]*?>/; // 게시글 HTML 에러 정규 표현식
      const RE_CONTENT = /^[\s\S]{1,3000}$/; // 게시글 내용 정규 표현식

      const resultSchema = postSchema.validate(req.body);

      const { title, content } = resultSchema.value;
      const { userId } = res.locals.user;

      if (resultSchema.error) {
        return res.status(412).json({
          errorMessage: '데이터 형식이 올바르지 않습니다.',
        });
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

      return res.json({ result: post });
    } catch (error) {
      //console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      throw error;
    }
  };

  // 게시글 수정
  modifyPost = async ({ postId, userId, title, content }) => {
    try {
      const RE_TITLE = /^[a-zA-Z0-9\s\S]{1,40}$/; //게시글 제목 정규 표현식
      const RE_HTML_ERROR = /<[\s\S]*?>/; // 게시글 HTML 에러 정규 표현식
      const RE_CONTENT = /^[\s\S]{1,3000}$/; // 게시글 내용 정규 표현식

      const { postId, userId, title, content } = req.body;

      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError('데이터 형식이 올바르지 않습니다.');
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

      const updateCount = await Posts.update(
        { title, content },
        { where: { postId, userId } }
      );

      if (updateCount < 1) {
        return res.status(401).json({
          errorMessage: '게시글이 정상적으로 수정되지 않았습니다.',
        });
      }

      const post = await this.postsService.modifyPost({
        postId,
        userId,
        title,
        content,
      });

      return res.json({ result: post });
    } catch (error) {
      //console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      throw error;
    }
  };

  // 게시글 삭제
  deletePost = async (postId, userId, title, content) => {
    try {
      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError('게시글을 삭제할 수 없습니다.');
      }

      const posts = await this.postsRepository.getOnePost({ postId });

      if (!posts) {
        return res.status(404).json({
          errorMessage: '게시글이 존재하지 않습니다.',
        });
      }

      const deleteCount = await this.postsRepository.getOnePost({
        where: { postId, userId },
      });

      if (deleteCount < 1) {
        return res.status(401).json({
          errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.',
        });
      }

      const post = await this.postsService.deletePost({
        postId,
        userId,
        title,
        content,
      });

      res.json({ result: post });
    } catch (error) {
      //console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      throw error;
    }
  };
}
module.exports = PostsService;
