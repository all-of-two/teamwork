const { Users } = require('../models');
const { Op } = require('sequelize');

class LoginRepository {
  constructor() {}

  getAllUser = async ({}) => {
    const users = await Users.findAll();

    return users;
  };

  getUserByPk = async ({ userId }) => {
    const user = await Users.findByPk(userId);

    return user;
  };

  findUser = async ({ id, nickname }) => {
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ id }, { nickname }],
      },
    });

    return user;
  };
}
module.exports = LoginRepository;
