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
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = User = mongoose.model("user", userSchema);
