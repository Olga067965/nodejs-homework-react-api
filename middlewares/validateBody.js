const { HttpError } = require("../helpers");
const validateBody = (schema) => {
  const func = (req, _res, next) => {
    console.log("Incoming data for validation:", req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      console.error("Validation error:", error.message);
      next(HttpError(400, error.message));
    } else {
      console.log("Validation successful");
      next();
    }
  };
  return func;
};

module.exports = validateBody;
