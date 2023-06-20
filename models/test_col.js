const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
