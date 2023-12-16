const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split("23h");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized 1"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, "Not authorized 2"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized 3"));
  }
};

module.exports = authenticate;
