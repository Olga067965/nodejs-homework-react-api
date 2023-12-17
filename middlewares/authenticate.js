const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authenticate = async (req, _res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      return next(HttpError(401, "Not authorized 1"));
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const { id } = decoded;
    const user = await User.findById(id);

    if (!user) {
      return next(HttpError(401, "Not authorized 2"));
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    next(HttpError(401, "Not authorized 3"));
  }
};

module.exports = authenticate;
