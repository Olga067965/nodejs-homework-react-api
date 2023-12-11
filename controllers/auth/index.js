const register = require("./authRegister");
const login = require("./authLogin");
const logout = require("./authLogout");
const current = require("./authCurrent");
const updateSubscription = require("./authUpdate");

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
};
