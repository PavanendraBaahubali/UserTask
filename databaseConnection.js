const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURI = process.env.dbURI;
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
