const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  ServiceProviderId: {
    type: Schema.Types.ObjectId,
    ref: "ServiceProvider",
  },
  bookedDate: {
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
module.exports = ServiceSession = mongoose.model(
  "ServiceSession",
  serviceSessionSchema
);
