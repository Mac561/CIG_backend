const mongoUsers = require("../models/mongoUsers"); //importing schema

const handleGetUsers = async (req, res) => {
  //get all users
  try {
    const user = await mongoUsers.find(); //find all mongodb users
    res.json(user); //respond with user json
  } catch (err) {
    res.status(500).json({ message: err.message }); //if error, send message
  }
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

const newSub = async (req, res) => {
  //create new user
  //new user
  const user = new mongoUsers({
    //create new user object
    id: req.body.id,
    name: req.body.name,
    trainingComplete: req.body.trainingComplete
  });

  try {
    existingUser = await mongoUsers.find(req.params.name); //find if user exists through name (should be through something like email)
    if (existingUser == null) {
      //if user does not exist
      const newUser = await user.save(); //save to mongoUsers
      res.status(201).json(newUser); //send successful status and user object
    } else {
      return res.status(404).json({ message: "user already exists" }); //send user already exists
    }
  } catch (err) {
    res.status(400).json({ message: err.message }); //catch error
  }
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
