const { default: mongoose } = require("mongoose");
const User = require("../models/userSchema");
const comparePassword = require("../utils/security/comparePassword");
const hashPassword = require("../utils/security/hashPassword");
const { NotFoundError, UnAuthorizedError } = require("../errors/customErrors");
const generateJWT = require("../utils/security/generateJWT");

const registerUser = async (userData) => {
  const { userName, emailId, passWord } = userData;

  try {
    const isUserExist = await User.findOne({ emailId });
    if (isUserExist) {
      throw new Error("User Already Existed");
    }
    const newUser = new User({
      userName,
      passWord: await hashPassword(passWord),
      emailId,
    });
    await newUser.save();
    const jwtToken = generateJWT(newUser);
    return jwtToken;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const loginUser = async (loginData) => {
  const { emailId, passWord } = loginData;

  const userData = await User.findOne({
    emailId,
  });
  if (!userData) {
    throw new NotFoundError("User Not Found.");
  }
  const isPasswordMatch = await comparePassword(passWord, userData.passWord);
  console.log("isPasswordMatch", isPasswordMatch);
  if (!isPasswordMatch) {
    throw new UnAuthorizedError("Invalid Credential.");
  }
  return generateJWT(userData);
};

module.exports = { registerUser, loginUser };
