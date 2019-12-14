const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    require: true
  },
  lName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: false,
    default: 0
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  },
  department: {
    type: String,
    require: false
  },
  section: {
    type: Number,
    require: false,
    default: 0
  },
  time: {
    type: Date,
    require: false,
    default: null
  }
});

module.exports = User = mongoose.model("user", userSchema);
