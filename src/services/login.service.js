const LoginRepository = require('../repositories/login.repository');
const { ValidationError } = require('../exceptions/index.exception');

class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }

  getAllUser = async ({}) => {
    const users = await this.usersRepository.getAllUser({});

    return users;
  };

  getUserByPk = async ({ userId }) => {
    const user = await this.usersRepository.getUserByPk({
      userId,
    });

    return user;
  };

  findUser = async ({ nickname }) => {
    const user = await this.usersRepository.findUser({
      nickname,
    });
  };
}

module.exports = LoginService;
