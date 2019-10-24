require("dotenv").config(); //will load up all enviromental variables

//external packages
const express = require("express"); //importing express package
const server = express(); //declaring the server
const mongoose = require("mongoose"); //connecting to mongodb
const bodyParser = require("body-parser"); //request body json parser
const cors = require("cors"); //what domains can access server
const bcrypt = require("bcrypt"); //for hashing passwords

//controllers
const user = require("./controllers/user");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => {
  console.log("Connected to database");
});

server.use(bodyParser.json()); //be able to read json
server.use(cors()); //domain access

server.get("/", (req, res) => {
  res.send("its working");
});

server.get("/users/:id", (req, res) => {
  user.handleGetUser(req, res);
});

server.get("/users", (req, res) => {
  user.handleGetUsers(req, res);
});

server.post("/user", (req, res) => {
  user.newSub(req, res);
});

server.listen(process.env.PORT || 8081, () => {
  //running on port 8080 OR enviroment port
  if (process.env.PORT != undefined) {
    console.log(`running on port ${process.env.PORT}`);
  } else {
    console.log("running on port 8081");
  }
});
