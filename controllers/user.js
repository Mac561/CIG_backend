const mongoUsers = require("../models/mongoUsers");

const handleGetUsers = async (req, res) => {
  try {
    const user = await mongoUsers.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleGetUser = (req, res) => {
  const { id } = req.params;
  res.json({
    pass: "yes"
  });
};

const newSub = async (req, res) => {
  const user = new mongoUsers({
    id: req.body.id,
    name: req.body.name,
    trainingComplete: req.body.trainingComplete
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  handleGetUser: handleGetUser,
  handleGetUsers,
  newSub
};
