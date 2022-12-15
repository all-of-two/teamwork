require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const routes = require('./routes/index.js');

// const { tokenObject } = require('./controller/login.controller')
app.use(express.urlencoded({ extended: false }));
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/errorHandlerMiddleware');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// const port = process.env.EXPRESS_PORT || 3000;

// app.use(errorLogger); // Error Logger

app.use('/', routes);

app.use(errorHandler); // Error Handler

module.exports = app;
