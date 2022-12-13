require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

const {
  errorHandler,
  errorLogger,
} = require('./middlewares/errorHandlerMiddleware');

const cookieParser = require('cookie-parser');

const port = process.env.EXPRESS_PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(errorLogger); // Error Logger

app.use('/', routes);

app.use(errorHandler); // Error Handler

app.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

// module.exports = http;
