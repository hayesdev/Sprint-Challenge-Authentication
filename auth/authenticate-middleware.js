/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const sessions = {};

function authenticate() {
  const authError = {
    message: "Invalid credentials",
  };

  return async (req, res, next) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  sessions,
  authenticate,
};
//  ^^^ this was throwing an error b/c i was exporting as an object by itself
