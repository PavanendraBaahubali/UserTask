const mongoose = require("mongoose");

const healthCareSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceDescription: { type: String, required: true },
  servicePrice: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

const HealthCare = mongoose.model("healthCare", healthCareSchema);
module.exports = HealthCare;
