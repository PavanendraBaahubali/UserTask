const mongoose = require("mongoose");
const getFormatedDate = require("../utils/getFormatedDate");

const userTaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskDue: { type: String, required: true },
  taskCreatedAt: { type: String, default: getFormatedDate() },
  taskUpdatedAt: { type: String, default: "" },
  taskStatus: { type: String, default: "Pending" },
});

const UserTask = mongoose.model("task", userTaskSchema);
module.exports = UserTask;
