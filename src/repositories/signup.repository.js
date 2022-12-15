const { Users } = require('../models');
const { Op } = require('sequelize');

class SignupRepository {
  constructor() {}

  createUser = async ({ id, password, nickname }) => {
    const user = await Users.create({
      id,
      password,
      nickname,
    });

    return user;
  };
}

module.exports = SignupRepository;
