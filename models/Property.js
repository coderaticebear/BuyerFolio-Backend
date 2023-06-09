const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  propertyType: {
    type: String,
  },
  location: {
    type: String,
  },
  isSold: {
    type: Boolean,
  },
  soldDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = Property = mongoose.model('Property', propertySchema)
