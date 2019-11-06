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
  admin:{
    type: Boolean,
    require: true,
    require: false
  },
  department:{
    type: String
  },
  trainingComplete: {
    type: Boolean,
    require: true,
    default: false
  },
   //array sections # of sections{ record: int, complete: boolean }  
  sections:[{
    record: Number,
    complete: Boolean
  }],
   
  password: {
    type: String,
    require: true
  }
 
 
  
});

module.exports = User = mongoose.model("user", userSchema);
