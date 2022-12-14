const httpMocks = require('node-mocks-http');
const SignupController = require('./signup.controller');
const signupController = new SignupController();

let req, res, next;

describe('회원가입 컨트롤러 테스트', () => {
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    signupController.userService.checkBody = jest.fn();
    signupController.userService.findUser = jest.fn();
    signupController.userService.createUser = jest.fn();
  });

  describe('회원가입 컨트롤러 테스트', () => {
    it('뭘 테스트 해야될지 모르겠어요 ㅜ ㅜ', async () => {
      const createUserData = {
        nickname: 'asdf1234',
        password: 'qwer5678',
        confirm: 'qwer5678',
      };
      req.body = createUserData;

      await signupController.createUser(req, res, next);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData().message).toStrictEqual(
        '회원 가입에 성공하였습니다.'
      );
    });
  });
});
