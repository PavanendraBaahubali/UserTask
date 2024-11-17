const bcrypt = require("bcryptjs");

const hashPassword = async (passWord) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passWord, salt);
    return hashedPassword;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = hashPassword;
