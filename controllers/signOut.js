const redisClient = require("../controllers/signIn").redisClient;

const signOut = (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    return redisClient.del(authorization, (err, reply) => {
      if (err || !reply) {
        return res.status(401).json("No Session");
      }
      return res.status(200).json("Signed Out");
    });
  } else {
    return res.status(401).json("No Session");
  }
};

module.exports = {
  signOut
};
