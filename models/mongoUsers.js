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
    type: String,
    require: false,
    default: "Not Started"
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
  sections: [sectionSchema]
  //sections, object, # of sections hardcoded, { record: int, complete: boolean }
});

module.exports = User = mongoose.model("user", userSchema);
