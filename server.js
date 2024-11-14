const express = require("express");
const connectDB = require("./databaseConnection");
const healthServiceRouter = require("./routers/healthServiceRouter");
require("dotenv").config();

const app = express();

app.use(express.json());

const startServer = async () => {
  const PORT = process.env.PORT;
  try {
    const db = await connectDB();
    app.use("/api/v1/healthCare", healthServiceRouter());
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

startServer();
