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
    try {
      const posts = await this.postsRepository.getAllPost({});

      return { posts };
    } catch (error) {
      throw error;
    }
  };

  // 게시글 상세 조회
  getOnePost = async ({}) => {
    try {
      const posts = await this.postsRepository.getOnePost({});
      return { data: posts };
    } catch (error) {
      throw error;
    }
  };

  // 게시글 작성
  createPost = async ({ userId, title, content }) => {
    try {
      const post = await this.postsRepository.createPost({
        userId,
        title,
        content,
      });

      return { result: post };
    } catch (error) {
      throw error;
    }
  };

  // 게시글 수정
  modifyPost = async ({ postId, userId, title, content }) => {
    try {
      const RE_TITLE = /^[a-zA-Z0-9\s\S]{1,40}$/; //게시글 제목 정규 표현식
      const RE_HTML_ERROR = /<[\s\S]*?>/; // 게시글 HTML 에러 정규 표현식
      const RE_CONTENT = /^[\s\S]{1,3000}$/; // 게시글 내용 정규 표현식
      const { title, content } = resultSchema.value;
      const { userId } = res.locals.user;

      if (!postId || !userId || !title || !content) {
        throw new InvalidParamsError('데이터 형식이 올바르지 않습니다.');
      }
      if (
        !isRegexValidation(title, RE_TITLE) ||
        isRegexValidation(title, RE_HTML_ERROR)
      ) {
        throw new InvalidParamsError('게시글 제목의 형식이 일치하지 않습니다.');
      }
      if (!isRegexValidation(content, RE_CONTENT)) {
        throw new InvalidParamsError('게시글 내용의 형식이 일치하지 않습니다.');
      }

      const updateCount = await Posts.update(
        { title, content },
        { where: { postId, userId } }
      );

      if (updateCount < 1) {
        throw new InvalidParamsError('게시글을 수정할 수 없습니다.');
      }

      const post = await this.postsService.modifyPost({
        postId,
        userId,
        title,
        content,
      });

      return res.json({ result: post });
    } catch (error) {
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
        throw new InvalidParamsError('게시글이 존재하지 않습니다.');
      }

      const deleteCount = await this.postsRepository.getOnePost({
        where: { postId, userId },
      });

      if (deleteCount < 1) {
        throw new InvalidParamsError(
          '게시글을 정상적으로 삭제되지 않았습니다.'
        );
      }

      const post = await this.postsService.deletePost({
        postId,
        userId,
        title,
        content,
      });

      res.json({ post });
    } catch (error) {
      throw error;
    }
  };
}
module.exports = PostsService;
