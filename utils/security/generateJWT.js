const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  const secretKey = process.env.SECRETKEY;
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
};

module.exports = generateJWT;
