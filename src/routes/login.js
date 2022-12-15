// const Joi = require('joi');
// const { Users, sequelize, Sequelize } = require('../models');
// const { Op } = require('sequelize');
// const jwt = require('jsonwebtoken');

// require('dotenv').config();

const express = require('express');
const router = express.Router();

const authUserLoginMiddleware = require('../middlewares/authUserLoginMiddleware');

const { LoginController } = require('../controllers/login.controller');
const loginController = new LoginController();

let tokenObject = {};

router.post('/', authUserLoginMiddleware, loginController.getAllUser);

module.exports = router;
