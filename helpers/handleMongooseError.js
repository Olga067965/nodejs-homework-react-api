const handleMongooseError = (error, _data, next) => {
  const { name, code } = error;
  const customError = new Error();

  if (name === "MongoServerError" && code === 11000) {
    customError.status = 409;
    customError.message = "Duplicate key error";
  } else {
    customError.status = 400;
    customError.message = "Bad request";
  }

  next(customError);
};

module.exports = handleMongooseError;
