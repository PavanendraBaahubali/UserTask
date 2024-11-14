const express = require("express");
const healthServiceController = require("../controllers/healthServiceController");

const healthServiceRouter = () => {
  const router = express.Router();
  try {
    // add router
    router.post("/add", (req, res) =>
      healthServiceController.addHealthCareSerivce(req, res)
    );

    // all services router
    router.get("/getAllServices", (req, res) =>
      healthServiceController.getAllHealthCareServices(req, res)
    );

    // update the service
    router.put("/updateService", (req, res) =>
      healthServiceController.updateHealthCareServices(req, res)
    );

    // delete a particular health care service
    router.delete("/deleteService", (req, res) =>
      healthServiceController.deleteHealthCareService(req, res)
    );
  } catch (err) {
    console.log(err);
  }
  return router;
};

module.exports = healthServiceRouter;
