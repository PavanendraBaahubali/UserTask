const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://konkonapalapavan925:SgNzRZ3PrLpqI23L@learnnode.fv8cc.mongodb.net/HealthCare?retryWrites=true&w=majority&appName=LearnNode";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Database connected");
    return mongoose.connection.db; // Return the database connection
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = connectDB;
