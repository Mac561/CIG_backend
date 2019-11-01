require("dotenv").config(); //will load up all enviromental variables

//external packages
const express = require("express"); //importing express package
const server = express(); //declaring the server
const mongoose = require("mongoose"); //connecting to mongodb
const bodyParser = require("body-parser"); //request body json parser
const cors = require("cors"); //what domains can access server
const bcrypt = require("bcryptjs"); //for hashing passwords

//controllers
const user = require("./controllers/user");
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

//get all users -> change route
server.get("/users", (req, res) => {
  user.handleGetUsers(req, res);
});

//get a user with id
server.get("/user/:id", (req, res) => {
  user.handleGetUser(req, res);
});

// add new user -> change route -> /user/create
server.post("/user", (req, res) => {
  user.newUser(req, res, bcrypt);
});

//delete user by id
server.delete("/user/:id", (req, res) => {
  user.deleteUser(req, res);
});


//debub ignore
server.get("/logins", (req, res) => {
  user.getLogins(req, res);
});

//signIn
server.post("/signIn", signIn.handleAuth(bcrypt));

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
