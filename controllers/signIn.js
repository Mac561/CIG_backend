const mongoLogin = require("../models/mongoLogin");
const mongoUsers = require("../models/mongoUsers");

//external dependencies
const jwt = require("jsonwebtoken");
const redis = require("redis");

//setup redis
const redisClient = redis.createClient("redis://redis:6379");

const handleSignIn = async (req, res, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }

  let loginInfo;
  try {
    loginInfo = await mongoLogin.find({ email });
    if (loginInfo == null) {
      return Promise.reject({ message: "user does not exist" });
    }
  } catch (error) {
    return Promise.reject({ message: error.message });
  }

  const isValid = bcrypt.compareSync(password, loginInfo[0].password);
  if (isValid) {
    const user = await mongoUsers.find({ email });
    return user;
  } else {
    Promise.reject("Wrong Combo");
  }
};

const getToken = (req, res) => {
  const { authorization } = req.headers;
  redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      //later add .then in main signin, and return promise
      return res.status(400).json("Unauthorized");
    }
    return res.json({ id: reply });
  });
};

const setToken = (token, id) => {
  //token is key, id is value in redis db
  return Promise.resolve(redisClient.set(token, id));
};

const createSessions = user => {
  //create JWT token, return user data
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token };
    })
    .catch(console.log);
};

const signToken = email => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JTW_SECRET", { expiresIn: "2 hours" }); //secret will be an enviromental variable
};

const handleAuth = bcrypt => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getToken(req, res)
    : handleSignIn(req, res, bcrypt)
        .then(data => {
          return data[0].id && data[0].email
            ? createSessions(data[0])
            : Promise.reject(data[0]);
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
};

module.exports = {
  handleAuth,
  redisClient
};
