const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  propertyType: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  isSold: {
    type: Boolean,
  },
  soldDate: {
    type: Date,
  },
  propertyImage: {
    type: String
  }, 
  price: {
    type: Number
  },
  beds: {
    type: Number
  },
  bath: {
    type: Number
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
