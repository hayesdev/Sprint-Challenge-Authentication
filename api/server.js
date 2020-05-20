const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
// const authenticate = require("../auth/authenticate-middleware");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const usersRouter = require("../users/users-router");
const dbConfig = require("../database/dbConfig");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(
  session({
    name: "token", // overwrites default cookie name, hides our stack better
    resave: false, // avoid recreating sessions if they haven't changed
    saveUninitialized: false, // GDPR laws against setting cookies automatically
    secret: process.env.COOKIE_SECRET || "secret", // cryptographically sign the cookie
    cookie: {
      httpOnly: true, // disallow JS to read cookie content
      //   maxAge: 60 * 1000, // expires the cookie after 60 seconds
    },
    store: new KnexSessionStore({
      knex: dbConfig, // configured instance of knex
      createTable: true, // if the session table doesn't exist, create automatically
    }),
  })
);
server.use("/api/auth", authRouter);
// server.use("/api/jokes", authenticate, jokesRouter); **** might need to put this back ***
server.use("/api/jokes", jokesRouter);
server.use("/api/users", usersRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
