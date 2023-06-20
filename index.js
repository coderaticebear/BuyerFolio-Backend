require('dotenv');
const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const settings = require("./config/settings");
const db = settings.mongoURL;
const userRouter = require("./routes/api/user");
const cobuyerRouter = require("./routes/api/cobuyer")

// Connect to MongoDB
mongoose
  .connect(db) // Connect to the MongoDB database using the provided URL
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

// Use the router for handling "/user/api" routes
app.use("/user/api", userRouter);
app.use("/cobuyer/api", cobuyerRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
