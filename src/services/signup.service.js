const SignupRepository = require('../repositories/signup.repository');
const { ValidationError } = require('../exceptions/index.exception');

class SignupService {
  constructor() {
    this.signupRepository = new SignupRepository();
  }

  createUser = async ({ nickname, password, confirm }) => {
    const isExistUser = await this.findUser({ nickname });

    if (isExistUser) {
      if (isExistUser.nickname === nickname)
        throw new ValidationError(
          '동일한 닉네임을 가진 User가 이미 존재합니다.'
        );
    }

    const user = await this.uRepository.createUser({
      nickname,
      password,
      confirm,
    });

    return user;
  };
}

module.exports = SignupService;
