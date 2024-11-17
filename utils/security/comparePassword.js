const bcrypt = require("bcryptjs");

const comparePassword = (givenPassword, actualPassword) => {
  return bcrypt.compare(givenPassword, actualPassword);
};

module.exports = comparePassword;
