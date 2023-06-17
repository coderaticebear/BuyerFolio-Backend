require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const settings = require("./config/settings");
const db = settings.mongoURL;
const userRouter = require("./routes/api/user");
const userRouter1 = require("./routes/api/property");
const userRouter2 = require("./routes/api/auth");
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let otpCollection;

mongoClient.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  otpCollection = mongoClient.db().collection('otp');
  console.log('Connected to MongoDB');
});



// Connect to MongoDB
mongoose
  .connect(db) // Connect to the MongoDB database using the provided URL
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));

// Use the router for handling "/user/api" routes
app.use("/user/api", userRouter);
app.use("/property/api", userRouter1);
app.use("/auth/api", userRouter2);
// Start the server
app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
