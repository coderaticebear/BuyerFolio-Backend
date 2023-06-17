const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coBuyerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
  },
  lastName: {
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
module.exports = CoBuyer = mongoose.model("CoBuyer", coBuyerSchema);
