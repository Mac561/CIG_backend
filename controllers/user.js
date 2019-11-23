const mongoUsers = require("../models/mongoUsers");
const mongoLogin = require("../models/mongoLogin");

const Sections = require("../models/sections");

const handleGetUsers = async (req, res) => {
  mongoUsers
    .find()
    .sort({ name: 1 })
    .then(users => res.json(users));
};

const handleGetUser = async (req, res) => {
  const { id } = req.params;
  let user;
  try {
    user = await mongoUsers.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "user does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.send(user);
};

//change to add new data
const newUser = async (req, res, bcrypt) => {
  const { name, email, password, status, isAdmin, department } = req.body;

  const newUser = new mongoUsers({
    name,
    email,
    status,
    isAdmin,
    department,
    sections: Sections
  });

  const hashPass = bcrypt.hashSync(password);

  const newLogin = new mongoLogin({
    email,
    password: hashPass
  });

  const emailName = email;

  const existingUser = await mongoUsers.findOne({ email: emailName });
  if (existingUser) {
    return res.status(404).json({ message: "user already exists" });
  } else {
    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
    newLogin.save().then(log => {});
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  let user;
  try {
    user = await mongoUsers.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "user does not exist" });
    } else {
      user.remove();
      res.json({ message: `deleted user with id ${id}` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  res.json("update comming soon");
};

module.exports = {
  handleGetUser: handleGetUser,
  handleGetUsers,
  newUser,
  deleteUser,
  updateUser
};
