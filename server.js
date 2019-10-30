require("dotenv").config(); //will load up all enviromental variables

//external packages
const express = require("express"); //importing express package
const server = express(); //declaring the server
const mongoose = require("mongoose"); //connecting to mongodb
const bodyParser = require("body-parser"); //request body json parser
const cors = require("cors"); //what domains can access server
const bcrypt = require("bcryptjs"); //for hashing passwords

//controllers
const user = require("./controllers/user"); //user controller (user.js)
const signIn = require("./controllers/signIn");

// const db = require("./config/keys").mongoURI;
const db = "mongodb://mongo:27017/docker-node-mongo";
mongoose
  .connect(db, { useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const port = process.env.PORT || 8082;

server.use(bodyParser.json()); //be able to read json
server.use(cors()); //domain access

//route to make sure express is working
server.get("/", (req, res) => {
  res.send("its working");
});

server.get("/users", (req, res) => {
  //get all users
  user.handleGetUsers(req, res);
});
server.get("/users/:id", (req, res) => {
  //get a user with id
  user.handleGetUser(req, res);
});

server.post("/user", (req, res) => {
  // add new user
  user.newSub(req, res, bcrypt);
});

server.delete("/user/:id", (req, res) => {
  //delete user by id
  user.deleteUser(req, res);
});

//signIn
server.post("/signIn", (req, res) => {});

server.listen(port, () => {
  //running on port 8080 OR enviroment port
  console.log(`server running on ${port}`);
});
