const errorLogger = (error, request, response, next) => {
  console.error(error);
  next(error); // errorLogger -> errorHandler
};

const errorHandler = (error, req, res, next) => {
  // if(process.env.NODE_ENV !== production) 
  console.log({ error });
  
  const status = error.status || 400;
  res.status(status);
  res.json({ errorMessage: error.message });
};

module.exports = { errorLogger, errorHandler };
