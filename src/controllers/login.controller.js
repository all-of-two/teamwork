const UserService = require('../services/user.service');
const { InvalidParamsError } = require('../exceptions/index.exception');
const cookieParser = require('cookie-parser');

let tokenObject = {};
class LoginController {
  userService = new UserService();

  /**
   * @param {import("express").request} req - express Request
   * @param {import("express").response} res - express Response
   **/

  getAllUser = async (req, res) => {
    try {
      const { nickname, password } = req.body;


      console.log(nickname,password)

      const existsUser = await this.userService.existsUser(nickname, password);
      console.log(3, existsUser);
      const accessToken = this.userService.createAccessToken(existsUser.userId);
      console.log(4, accessToken);
      const refreshToken = this.userService.createRefreshToken();
      console.log(5, refreshToken);
      // tokenObject[refreshToken] = existsUser.userId;
      // console.log(4, tokenObject);
      res.cookie('accessToken', `Bearer ${accessToken}`);
      res.cookie('refreshToken', `Bearer ${refreshToken}`);
      console.log(6);
      return res.status(200).json({ token: `Bearer ${accessToken}` });
    } catch (err) {
      new InvalidParamsError(err, res);
      return;
    }
  };
}

module.exports = { LoginController, tokenObject };
