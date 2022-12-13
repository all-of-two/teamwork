const SignupRepository = require('../repositories/signup.repository');
const { ValidationError } = require('../exceptions/index.exception');

class SignupService {
  constructor() {
    this.signupRepository = new SignupRepository();
  }

  createUser = async ({ id, password, nickname }) => {
    const isExistUser = await this.findUser({ id, nickname });

    if (isExistUser) {
      if (isExistUser.id === id)
        throw new ValidationError('동일한 ID를 가진 User가 이미 존재합니다.');
      else if (isExistUser.nickname === nickname)
        throw new ValidationError(
          '동일한 Nickname을 가진 User가 이미 존재합니다.'
        );
    }

    const user = await this.uRepository.createUser({
      id,
      password,
      nickname,
    });

    return user;
  };
}

module.exports = SignupService;
