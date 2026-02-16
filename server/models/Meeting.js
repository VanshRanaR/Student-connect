const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  date: String,
  time: String,

  message: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Meeting", meetingSchema);
