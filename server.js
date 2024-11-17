const express = require("express");
const connectDB = require("./utils/databaseConnection");
const taskRouter = require("./routers/taskRouter");
const authRouter = require("./routers/authRouter");
require("dotenv").config();

const app = express();

// parse the request and response data into json
app.use(express.json());

const startServer = async () => {
  const PORT = process.env.PORT;
  try {
    await connectDB();

    // router middlewares
    app.use("/api/v1", taskRouter());
    app.use("/api/v1/auth", authRouter());

    // server listening
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();
