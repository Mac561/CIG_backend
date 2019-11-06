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
  sections: [
    {
      record: Number,
      complete: Boolean
    }
  ]
  //sections, object, # of sections hardcoded, { record: int, complete: boolean }
});

module.exports = User = mongoose.model("user", userSchema);
