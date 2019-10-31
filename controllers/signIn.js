const mongoLogin = require("../models/mongoLogin");
const mongoUsers = require("../models/mongoUsers");

const handleSignIn = async (req, res, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  let loginInfo;
  try {
    loginInfo = await mongoLogin.find({ email });
    if (loginInfo == null) {
      return res.status(400).json({ message: "user does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const isValid = bcrypt.compareSync(password, loginInfo[0].password);
  if (isValid) {
    const user = await mongoUsers.find({ email });
    res.json(user);
  } else {
    res.status(400).json("Wrong Combo");
  }
};

module.exports = {
  handleSignIn
};
