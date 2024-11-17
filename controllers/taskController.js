const taskService = require("../services/taskService");
const validTaskData = require("../utils/validTaskData");

// // Add a service
const addUserTask = async (req, res) => {
  if (req.body === undefined) {
    return res.status(404).json("All fields are required");
  }
  const { taskName, taskDescription, taskDue, taskTitle } = req.body;
  try {
    validTaskData(req.body, "CreateTask");
    const addTaskData = { taskName, taskDescription, taskDue, taskTitle };
    taskService.addTask(addTaskData);

    return res
      .status(200)
      .json({ message: "New Task has been successfully added." });
  } catch (err) {
    console.log(err);
    if (err.message) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Error" });
  }
};

// // Get all the available Services
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskService.getAllUserTasks();
    if (allTasks.length == 0) {
      return res
        .status(404)
        .json({ message: "No Available Tasks were found." });
    }
    return res.status(200).send(allTasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

// // Modify the service
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  if (req.body === undefined) {
    return res
      .status(404)
      .json({ message: "Please provide the data that you wanna modify" });
  }
  try {
    const msg = await taskService.updateTask(req.body, taskId);
    return res.status(200).json({
      message: msg,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// // Delete health care
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  console.log(taskId, "from controller");
  if (!taskId) {
    return res.status(404).json({ message: "Service Id is required" });
  }
  try {
    const msg = await taskService.deleteTask({ taskId });
    return res.status(200).json({ message: msg });
  } catch (err) {
    console.log(err);
  }
};

const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.getTaskById(taskId);
    if (task.length === 0) {
      return res
        .status(404)
        .json({ message: `No task was found with task id :${taskId} ` });
    }
    return res.status(200).json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong while retreiving data from database",
    });
  }
};

const updateTaskStatus = async (req, res) => {
  console.log("controller called");
  const { taskId } = req.params;
  console.log("taskid", taskId);
  if (!taskId) {
    return res.status(404).json({ message: `Task id is required` });
  }
  try {
    const msg = await taskService.updateTaskStatus(taskId);
    return res.status(200).json({ message: msg });
  } catch (err) {
    if (err.message) {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addUserTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
};
