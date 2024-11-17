const express = require("express");
const authController = require("../controllers/authController");

const authRouter = () => {
  const router = express.Router();
  try {
    // register user
    router.post("/register", (req, res) =>
      authController.registerUser(req, res)
    );
    // login user
    router.post("/login", (req, res) => authController.loginUser(req, res));
  } catch (err) {
    console.log(err);
  }
  return router;
};

module.exports = authRouter;
