const UserService = require('../services/user.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class SignupController {
  constructor() {
    this.userService = new UserService();
  }

  /**
   * @param {import("express").request} req - express Request
   * @param {import("express").response} res - express Response
   **/

  // [회원가입 API]

  createUser = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;

      const data = await this.userService.checkBody(
        nickname,
        password,
        confirm
      );

      await this.userService.findUser(nickname);
      await this.userService.createUser(nickname, password);

      res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      console.log(error);
      next(new InvalidParamsError(error, res));
    }
  };
}

module.exports = SignupController;

// function isRegexValidation(target, regex) {
//   return target.search(regex) !== -1;
// }

//     try {
//       const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
//       const re_password = /^[a-zA-Z0-9]{4,30}$/;

//       const userSchema = Joi.object({
//         nickname: Joi.string().pattern(re_nickname).required(),
//         password: Joi.string().pattern(re_password).required(),
//         confirm: Joi.string(),
//       });

//       const { nickname, password, confirm } = await userSchema.validateAsync(
//         req.body
//       );

//       if (password !== confirm) {
//         return res.status(412).send({
//           errorMessage: '패스워드가 일치하지 않습니다.',
//         });
//       }
//       if (nickname.search(re_nickname) === -1) {
//         return res.status(412).send({
//           errorMessage: 'ID의 형식이 일치하지 않습니다.',
//         });
//       }
//       if (password.search(re_password) === -1) {
//         return res.status(412).send({
//           errorMessage: '패스워드 형식이 일치하지 않습니다.',
//         });
//       }
//       if (isRegexValidation(password, nickname)) {
//         return res.status(412).send({
//           errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
//         });
//       }
//       const user = await Users.findAll({
//         attributes: ['userId'],
//         where: { nickname },
//       });

//       if (user.length) {
//         return res.status(412).send({
//           errorMessage: '중복된 닉네임입니다.',
//         });
//       }

//       await Users.create({ nickname, password });
//       console.log(`${nickname} 님이 가입하셨습니다.`);

//       return res.status(201).send({ message: '회원 가입에 성공하였습니다.' });
//     } catch (error) {
//       console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//       return res.status(400).send({
//         errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
//       });
//     }
//   };
// }
// function isRegexValidation(target, regex) {
//   return target.search(regex) !== -1;
// }
