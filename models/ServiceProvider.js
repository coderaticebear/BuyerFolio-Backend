const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceProvideSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = ServiceProvider = mongoose.model(
  "ServiceProvide",
  serviceProvideSchema
);
