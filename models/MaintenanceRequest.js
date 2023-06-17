const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maintenanceRequestSchema = new Schema({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  requestType: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
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

module.exports = MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
