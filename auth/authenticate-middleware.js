/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");

function restrict() {
  const authError = {
    message: "Invalid credentials",
  };

  return async (req, res, next) => {
    try {
      const { username, password } = req.headers;

      if (!username || !password) {
        return res.status(401).json(authError);
      }

      const user = await Users.findBy({ username }).first();

      if (!user) {
        return res.status(401).json(authError);
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        return res.status(401).json(authError);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
module.exports = (req, res, next) => {
  res.status(401).json({ you: "shall not pass!" });
};
