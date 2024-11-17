const UserTask = require("../models/userTaskSchema");
const mongoose = require("mongoose");
const getFormatedDate = require("../utils/getFormatedDate");

// Add a health care service
const addTask = async (addTaskData) => {
  const { taskName, taskDescription, taskDue, taskTitle } = addTaskData;
  try {
    const newTask = new UserTask({
      taskName,
      taskDescription,
      taskDue,
      taskTitle,
    });

    await newTask.save();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// Get all the available Services
const getAllUserTasks = async () => {
  try {
    const allTasks = await UserTask.find({});
    return allTasks;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// // Update the services
const updateTask = async (data, taskId) => {
  console.log(data);

  const { taskName, taskDescription, taskDue, taskTitle } = data;
  try {
    const userTaskData = await UserTask.findOne({
      _id: new mongoose.Types.ObjectId(taskId),
    });
    if (taskName) {
      userTaskData.taskName = taskName;
    }
    if (taskDescription) {
      userTaskData.taskDescription = taskDescription;
    }
    if (taskDue) {
      userTaskData.taskDue = taskDue;
    }
    if (taskTitle) {
      userTaskData.taskTitle = taskTitle;
    }
    userTaskData.taskUpdatedAt = getFormatedDate();
    userTaskData.taskStatus = "In Progress";
    await userTaskData.save();
    return `${taskName} has been successfully updated.`;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const deleteTask = async ({ taskId }) => {
  console.log("from service", taskId);
  try {
    await UserTask.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(taskId),
    });

    return `${taskId} has been deleted successfully.`;
  } catch (err) {
    throw new Error(err);
  }
};

const getTaskById = async (taskId) => {
  try {
    const task = await UserTask.findOne({
      _id: new mongoose.Types.ObjectId(taskId),
    });
    return task;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const updateTaskStatus = async (taskId) => {
  try {
    const task = await UserTask.findOne({
      _id: new mongoose.Types.ObjectId(taskId),
    });
    if (!task) {
      throw new Error(`taskID ${taskId} is not existed`);
    }
    task.taskStatus = "Completed";
    await task.save();
    return `${task.taskName} is marked as completed`;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  addTask,
  getAllUserTasks,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
};
