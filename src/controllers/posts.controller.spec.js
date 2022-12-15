const httpMocks = require('node-mocks-http');
const PostsController = require('./posts.controller');
const postsController = new PostsController();

let req, res, next;

describe('게시글 컨트롤러 테스트', () => {
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  describe('createPost 테스트', () => {
    it('userId값이 없을 때 게시글을 등록할 수 없습니다. 라는 메세지를 보냄?', async () => {
      const createPostData = {
        title: 'test title',
        content: 'test content',
        userId: 1,
        nickname: 'nick1234',
      };
      req.body.title = createPostData.title;
      req.body.content = createPostData.content;
      res.locals.user = { nickname: createPostData.nickname };

      await postsController.createPost(req, res, next);

      expect(next).toBeCalledWith(
        expect.objectContaining({ message: '게시글을 등록할 수 없습니다.' })
      );
    });

    it('resultSchema 에러 테스트 데이터 형식이 올바르지 않습니다. 라는 메세지를 보냄?', async () => {
      const createPostData = {
        title: 'test title',
        content: 'test content',
        userId: 1,
        nickname: 'nick1234',
      };
      req.body.content = createPostData.content;
      res.locals.user = {
        nickname: createPostData.nickname,
        userId: createPostData.userId,
      };

      await postsController.createPost(req, res, next);

      expect(next).toBeCalledWith(
        expect.objectContaining({ message: '데이터 형식이 올바르지 않습니다.' })
      );
    });

    it('제대로 요청 하면 게시글을 작성하였습니다.라는 메세지를 보냄?', async () => {
      const createPostData = {
        title: 'test title',
        content: 'test content',
        userId: 1,
        nickname: 'nick1234',
      };

      req.body.title = createPostData.title;
      req.body.content = createPostData.content;
      res.locals.user = {
        nickname: createPostData.nickname,
        userId: createPostData.userId,
      };

      postsController.postsService.createPost = jest.fn();

      await postsController.createPost(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData().message).toStrictEqual(
        '게시글을 작성하였습니다.'
      );
    });

    it('제대로 요청 하면 게시글을 작성하였습니다.라는 메세지를 보냄?', async () => {
      const postData = {
        postId: 1,
      };

      req.params.postId = postData.postId;

      postsController.postsService.getOnePost = jest.fn(() => ({
        postId: 1,
        title: 'test Title',
        content: 'test content',
      }));

      //   postsController.postsService.getOnePost = jest.fn();

      //   postsController.postsService.getOnePost.mockReturnValue({
      //     postId: 1,
      //     title: 'test Title',
      //     content: 'test content',
      //   });

      await postsController.getOnePost(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().result).toStrictEqual({
        postId: 1,
        title: 'test Title',
        content: 'test content',
      });
    });
  });
});
