const express = require("express");
const taskController = require("../controllers/taskController");
const verifyJwtMiddleWare = require("../middleWares/verifyJwtMiddleWare");

const taskRouter = () => {
  const router = express.Router();
  try {
    // add router
    router.post("/addTask", (req, res) => taskController.addUserTask(req, res));

    // all task router
    router.get("/getAllTasks", (req, res) =>
      taskController.getAllTasks(req, res)
    );

    // get user task by id
    router.get("/userTask/:taskId", (req, res) =>
      taskController.getTaskById(req, res)
    );

    // update the task router
    router.put("/updateTask/:taskId", (req, res) =>
      taskController.updateTask(req, res)
    );

    // delete a particular health care service
    router.delete("/deleteTask/:taskId", (req, res) =>
      taskController.deleteTask(req, res)
    );

    // marking user task as completed
    router.patch("/task/:taskId", (req, res) =>
      taskController.updateTaskStatus(req, res)
    );
  } catch (err) {
    console.log(err);
  }
  return router;
};

module.exports = taskRouter;
