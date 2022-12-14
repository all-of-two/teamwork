const { Users } = require('../models');
const request = require('supertest');
const app = require('../app');

describe('회원 가입 통합 테스트', () => {
  beforeAll(async () => {
    await Users.destroy({ where: {} });
  });
  it('post /signup 회원가입 잘 됨?', async () => {
    const signupData = {
      nickname: 'asdf333',
      password: 'qwer1234',
      confirm: 'qwer1234',
    };

    const res = await request(app).post('/signup').send(signupData);

    expect(res.statusCode).toStrictEqual(201);
    expect(res.body.message).toStrictEqual('회원 가입에 성공하였습니다.');
  });
});
