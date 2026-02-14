const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  senior: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  message: String,

  date: String,

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Meeting", meetingSchema);
