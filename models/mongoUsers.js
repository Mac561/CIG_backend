const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  trainingComplete: {
    type: Boolean,
    require: true,
    default: false
  }
});

module.exports = mongoose.model("mongoUsers", userSchema);
