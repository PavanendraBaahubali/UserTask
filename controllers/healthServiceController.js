const HealthCare = require("../models/healthCareSchema");
const healthCareServices = require("../services/healthCareServices");

// // Add a service
const addHealthCareSerivce = async (req, res) => {
  if (req.body === undefined) {
    return res.status(404).json("All fields are required");
  }
  const { serviceName, serviceDescription, servicePrice } = req.body;
  try {
    if (!serviceName) {
      return res.status(404).json({ message: "Service Name is required" });
    }
    if (!serviceDescription) {
      return res
        .status(404)
        .json({ message: "Service Description is required" });
    }
    if (!servicePrice) {
      return res.status(404).json({ message: "Service Price is required" });
    }
    const addServiceData = { serviceName, serviceDescription, servicePrice };
    healthCareServices.addService(addServiceData);

    return res
      .status(200)
      .json({ message: "New Service has been successfully added." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Error" });
  }
};

// Get all the available Services
const getAllHealthCareServices = async (req, res) => {
  try {
    const allAvailableServices = await healthCareServices.getAllServices();
    if (allAvailableServices.length == 0) {
      return res
        .status(404)
        .json({ message: "No Available services were found." });
    }
    return res.status(200).send(allAvailableServices);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

// Modify the service
const updateHealthCareServices = async (req, res) => {
  if (req.body === undefined) {
    return res
      .status(404)
      .json({ message: "Please provide the data that you wanna modify" });
  }
  try {
    const msg = await healthCareServices.updateService(req.body);
    return res.status(200).json({
      message: msg,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// Delete health care
const deleteHealthCareService = async (req, res) => {
  const { serviceId } = req.body;
  try {
    const msg = await healthCareServices.deleteServie({ serviceId });
    return res.status(200).json({ message: msg });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addHealthCareSerivce,
  getAllHealthCareServices,
  updateHealthCareServices,
  deleteHealthCareService,
};
