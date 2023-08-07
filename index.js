require('dotenv');
const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const settings = require("./config/settings");
const db = settings.mongoURL;
const plaid = require('plaid');
const cors = require('cors');


const userRouter = require("./routes/api/user");
const property = require("./routes/api/PropertyListing")
const prequalification = require("./routes/api/Prequalification");
const banking = require("./routes/api/Banking");


// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


// Connect to MongoDB
mongoose
  .connect(db) // Connect to the MongoDB database using the provided URL
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

// Use the router for handling "/user/api" routes
app.use("/api/user", userRouter);
app.use("/api/property", property)
app.use("/api/pre", prequalification)
app.use("/api/bank", banking)


// Start the server
app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
