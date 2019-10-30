const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  hash: {
    type: String,
    require: true
  }
});

module.exports = Login = mongoose.model("mongoLogin", loginSchema);
