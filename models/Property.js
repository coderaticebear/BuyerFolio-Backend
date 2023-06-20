const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  propertyID: {
    type: Number,
  },
  propertyType: {
    type: String,
  },
  location: {
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
  price: {
    type: Number,
  },
  price_per_sqft: {
    type: Number,
  },
  emi: {
    type: Number,
  },
  address: {
    type: String,
  },
  no_of_bath: {
    type: Number,
  },
  no_of_bed: {
    type: Number,
  },
  garage: {
    type: Boolean,
  },
  pool: {
    type: Boolean,
  },
  primeLocations: {
    type: Boolean,
  },
  propertyImage: {
    type: String
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
