const UserRepository = require('../repositories/user.repository');

require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { next } = require('cli');
// const express = require('express');

class UserService {
  userRepository = new UserRepository();

  checkBody = (nickname, password, confirm) => {
    if (!nickname || !password || !confirm) {
      throw 'DataError';
    }
    if (password !== confirm) {
      throw 'PasswordError';
    }

    if (password.length < 4 || password.indexOf(nickname) !== -1) {
      throw 'PasswordCheckError';
    }

    if (!/^(?=.*[a-zA-Z\d]).{3,}$/.test(nickname)) {
      throw 'NicknameCheckError';
    }
    next();
  };

  createUser = async (nickname, password) => {
    const secretPW = crypto
      .createHash(process.env.PW_KEY)
      .update(password)
      .digest(process.env.INCOD);

    password = secretPW;

    return this.userRepository.createUser(nickname, password);
  };

  findUser = async (nickname) => {
    const existsUser = await this.userRepository.findUser(nickname);

    if (existsUser.length !== 0) {
      throw 'NicknameOverlap';
    }
    next();
  };

  existsUser = async (nickname, password) => {
    console.log(nickname,password)
    const secretPW = crypto
      .createHash(process.env.PW_KEY)
      .update(password)
      .digest(process.env.INCOD);

    password = secretPW;

    const existsUser = await this.userRepository.existsUser(nickname, password);

    if (!existsUser || existsUser.length === 0) {
      throw 'NameOrPwError';
    }
    console.log(2, existsUser);
    return existsUser;
  };

  createAccessToken = (userId) => {
    return jwt.sign(
      { userId },
      process.env.SECRET_KEY, // 시크릿 키
      { expiresIn: '30m' } // 유효 시간
    );
  };

  createRefreshToken = () => {
    return jwt.sign(
      {}, // JWT 데이터z
      process.env.SECRET_KEY, // 시크릿 키
      { expiresIn: '7d' } // Refresh Token이 7일 뒤에 만료되도록 설정합니다.
    );
  };
}

module.exports = UserService;
