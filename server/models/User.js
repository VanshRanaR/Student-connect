const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "senior", "admin"],
    default: "student"
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "approved"
  },
  photo: {
  type: String,
  default: ""
},

  

  company: String,
  package: String,
  batch: String,
  profilePic: String

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
