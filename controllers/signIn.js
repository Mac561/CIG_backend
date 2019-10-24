const mongoLogin = require("../models/mongoLogin");

const handleSignIn = (req, res, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  //find email and password and if success, send success
};
