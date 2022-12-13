const LoginService = require('../services/login.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LoginController {
  constructor() {
    this.loginService = new LoginService();
  }

  /**
   * @param {import("express").request} req - express Request
   * @param {import("express").response} res - express Response
   **/

  getAllUser = async (req, res) => {
    try {
      const Users = await this.UsersService.getAllUser({});

      res.status(200).json({ result: Users });
    } catch (error) {
      console.error(error);
      res.status(error.status || 400);
      res.json({ errorMessage: error.message });
    }
  };
}

module.exports = LoginController;
