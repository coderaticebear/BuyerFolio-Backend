const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const financialSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  income: {
    type: Number,
  },
  expense: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
module.exports = Financial = mongoose.model("Financial", financialSchema);
