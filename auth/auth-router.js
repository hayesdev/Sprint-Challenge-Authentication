const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const { sessions, authenticate } = require("./authenticate-middleware");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  // implement registration
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    console.log(req.session);
    req.session.user = user;

    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", authenticate(), (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "Successfully logged out",
      });
    }
  });
});

module.exports = router;
