const express = require('express');
const Http = require('http');
const routes = require('./routes');
require('dotenv').config();

const {
  errorHandler,
  errorLogger,
} = require('./middlewares/errorHandlerMiddleware');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.use('/', routes);

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

// module.exports = http;
