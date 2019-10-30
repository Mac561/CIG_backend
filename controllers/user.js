const mongoUsers = require("../models/mongoUsers"); //importing schema
const mongoLogin = require("../models/mongoLogin");

const handleGetUsers = async (req, res) => {
  mongoUsers
    .find()
    .sort({ name: 1 })
    .then(users => res.json(users));
};

const handleGetUser = async (req, res) => {
  //get user with id
  const { id } = req.params; // pull id from /:id <- parameters
  let user; //declare user
  try {
    user = await mongoUsers.findById(req.params.id); //look for user by id
    if (user == null) {
      //if user does not exist
      return res.status(404).json({ message: "user does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }); //send message error
  }

  res.send(user); //send user object
};

const newSub = async (req, res, bcrypt) => {
  const { id, name, email } = req.body;

  const newUser = new mongoUsers({
    name,
    email
  });

  //check if user exists, if it doesn't then save
  newUser.save().then(user => res.json(user));
};

const deleteUser = async (req, res) => {
  //delete user with id
  const { id } = req.params; //pull id from params
  let user; //declare user beforehand
  try {
    user = await mongoUsers.findById(req.params.id); //find user through id
    if (user == null) {
      //if user does not exist
      return res.status(404).json({ message: "user does not exist" }); //send status & message
    } else {
      user.remove(); //if user does exist remove user from mongousers
      res.json({ message: `deleted user with id ${id}` }); //send response message
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }); //if error send message
  }
};

module.exports = {
  //export all functions to import in routes
  handleGetUser: handleGetUser,
  handleGetUsers,
  newSub,
  deleteUser
};
