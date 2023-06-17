const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  institutionName: {
    type: String,
  },
  degree: {
    type: String,
  },
  startYear: {
    type: Number,
  },
  endYear: {
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

module.exports = Education = mongoose.model("Education", educationSchema); 
