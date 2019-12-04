const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  record: {
    type: Number,
    default: 0
  },
  isComplete: {
    type: Boolean,
    default: false
  }
});

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

  // sections: [sectionSchema]
  //sections, object, # of sections hardcoded, { record: int, complete: boolean }
});

module.exports = User = mongoose.model("user", userSchema);
