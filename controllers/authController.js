const validTaskData = require("../utils/validTaskData");
const authService = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    validTaskData(req.body, "Register");
    const jwtToken = await authService.registerUser(req.body);
    return res
      .status(200)
      .json({ message: "user is register successfully.", token: jwtToken });
  } catch (err) {
    console.log(err);
    if (err.message) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({
      message: "Something went wrong while registering. Please try again.",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    validTaskData(req.body, "Login");
    const jwtToken = await authService.loginUser(req.body);
    return res
      .status(200)
      .json({ message: "User Logged in Successully.", token: jwtToken });
  } catch (err) {
    if (err.message) {
      return res.status(404).json({ message: err.message });
    }
    if (err.statusCode) {
      return res.status(statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
