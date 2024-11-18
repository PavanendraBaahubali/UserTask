const express = require("express");
const taskController = require("../controllers/taskController");
const verifyJwtMiddleWare = require("../middleWares/verifyJwtMiddleWare");

const taskRouter = () => {
  const router = express.Router();
  try {
    // All these routes are protected routes, so, these request has to be authenitcated.
    //  So, every request coming from these routes, verifyJwtMiddleWare middleware will intercept those
    // requests and validate their JWT Token.

    // add router
    router.post("/addTask", verifyJwtMiddleWare, (req, res) =>
      taskController.addUserTask(req, res)
    );

    // all task router
    router.get("/getAllTasks", verifyJwtMiddleWare, (req, res) =>
      taskController.getAllTasks(req, res)
    );

    // get user task by id
    router.get("/userTask/:taskId", verifyJwtMiddleWare, (req, res) =>
      taskController.getTaskById(req, res)
    );

    // update the task router
    router.put("/updateTask/:taskId", verifyJwtMiddleWare, (req, res) =>
      taskController.updateTask(req, res)
    );

    // delete a particular health care service
    router.delete("/deleteTask/:taskId", verifyJwtMiddleWare, (req, res) =>
      taskController.deleteTask(req, res)
    );

    // marking user task as completed
    router.patch("/task/:taskId", verifyJwtMiddleWare, (req, res) =>
      taskController.updateTaskStatus(req, res)
    );
  } catch (err) {
    console.log(err);
  }
  return router;
};

module.exports = taskRouter;
