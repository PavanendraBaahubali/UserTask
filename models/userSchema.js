const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  emailId: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
