const HttpError = (status, customMessage) => {
  const message = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
  };

  const errorMessage = customMessage || message[status] || "Error";
  const error = new Error(errorMessage);
  error.status = status;
  return error;
};

module.exports = HttpError;
