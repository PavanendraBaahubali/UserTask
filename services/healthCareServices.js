const HealthCare = require("../models/healthCareSchema");
const mongoose = require("mongoose");

// Add a health care service
const addService = async (addServiceData) => {
  const { serviceName, serviceDescription, servicePrice } = addServiceData;
  try {
    const newService = new HealthCare({
      serviceName,
      serviceDescription,
      servicePrice,
    });

    await newService.save();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// Get all the available Services
const getAllServices = async () => {
  try {
    const allAvailableServices = await HealthCare.aggregate([
      {
        $match: { isAvailable: true },
      },
    ]);

    return allAvailableServices;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// Update the services
const updateService = async (data) => {
  console.log(data);
  const { serviceId, serviceName, serviceDescription, servicePrice } = data;
  try {
    const serviceCareData = await HealthCare.findOne({
      _id: new mongoose.Types.ObjectId(serviceId),
    });
    if (serviceName) {
      serviceCareData.serviceName = serviceName;
    }
    if (serviceDescription) {
      serviceCareData.serviceDescription = serviceDescription;
    }
    if (servicePrice) {
      serviceCareData.servicePrice = servicePrice;
    }

    await serviceCareData.save();
    return `${req.body.serviceId}, ${req.body.serviceName} is successfully updated.`;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const deleteServie = async ({ serviceId }) => {
  try {
    await HealthCare.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(serviceId),
    });
    return `${serviceId} has been deleted successfully.`;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { addService, getAllServices, updateService, deleteServie };
