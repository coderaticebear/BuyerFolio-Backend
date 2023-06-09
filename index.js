const express = require("express");
const app = express();

const PORT = 8080;

const mongoose = require("mongoose");

const settings = require("./config/settings");
const db = settings.mongoURL;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Welcome to buyerfolio API");
});

app.listen(PORT, () => {
  console.log(`App running at PORT: ${PORT}`);
});
