const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const settings = require("./config/settings");
const db = settings.mongoURL;
const userRouter = require("./routes/api/user");

// Connect to MongoDB
mongoose
  .connect(db) // Connect to the MongoDB database using the provided URL
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

// Use the router for handling "/user/api" routes
app.use("/user/api", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
