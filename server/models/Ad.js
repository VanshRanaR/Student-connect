const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: String,

  media: String,     // image OR video file name

  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true
  },

  link: String,

  active: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Ad", adSchema);
