require("dotenv").config(); //will load up all enviromental variables

//external packages
const express = require("express"); //importing express package
const server = express(); //declaring the server
const mongoose = require("mongoose"); //connecting to mongodb
const bodyParser = require("body-parser"); //request body json parser
const cors = require("cors"); //what domains can access server
const bcrypt = require("bcryptjs"); //for hashing passwords
const multer = require("multer");
const fs = require("fs");
const zipper = require("zip-local");

//controllers
const user = require("./controllers/user");
const signIn = require("./controllers/signIn");
const signOut = require("./controllers/signOut");

//middleware
const auth = require("./middleware/authorization");

// const db = require("./config/keys").mongoURI;
const db = "mongodb://mongo:27017/docker-node-mongo";
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const port = process.env.PORT || 8082;

server.use(bodyParser.json()); //be able to read json
server.use(cors()); //domain access

//multer
const FILE_PATH = "upload";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    const dir = `./uploads/${id}`;

    fs.exists(dir, exists => {
      if (!exists) {
        console.log("directory doesn't exist");
        return fs.mkdirSync(dir, { recursive: true });
      }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, id + "-" + file.fieldname + "-" + Date.now());
  }
});

const upload = multer({ storage });

//route to make sure express is working
server.get("/", (req, res) => {
  res.send("its working");
});

//get all users -> change route
server.get("/user/all", auth.requireAuth, (req, res) => {
  user.handleGetUsers(req, res);
});

//get a user with id
server.get("/user/:id", auth.requireAuth, (req, res) => {
  user.handleGetUser(req, res);
});

// add new user -> change route -> /user/create
server.post("/user/create", (req, res) => {
  user.newUser(req, res, bcrypt);
});

server.post("/user/:id/file", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const id = req.params.id;

    if (!file) {
      res.status(400).send({
        status: false,
        data: "No File"
      });
    } else {
      //send respose
      res.send({
        status: true,
        message: "file is uploaded",
        data: {
          name: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

server.get("/user/:id/file", (req, res) => {
  console.log("Front hitting back");
  const { id } = req.params;
  const dir = `./uploads/${id}`;
  const name = "zippedFiles";

  zipper.sync
    .zip(dir)
    .compress()
    .save(`${dir}/${name}.zip`);

  res.status(200).download(`${dir}/${name}.zip`);
  // fs.unlinkSync(`${dir}/${name}.zip`);
});

server.put("/user/:id", auth.requireAuth, (req, res) => {
  user.updateUser(req, res);
});

//delete user by id
server.delete("/user/:id", auth.requireAuth, (req, res) => {
  user.deleteUser(req, res);
});

server.patch("/user/:id", auth.requireAuth, (req, res) => {
  user.updateUser(req, res);
});

//signIn
server.post("/signIn", signIn.handleAuth(bcrypt));

//signOut
server.post("/signOut", (req, res) => {
  signOut.signOut(req, res);
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});

//debug

server.get("/getLogins", (req, res) => {
  user.getLogs(req, res);
});
