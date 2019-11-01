const redisClient = require("../controllers/signIn").redisClient;

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    res.status(401).json("Unauthorized");
    res.end();
  } else {
    return redisClient.get(authorization, (err, reply) => {
      if (err || !reply) {
        return res
          .status(401)
          .json("Unauthorized")
          .end();
      }
      return next();
    });
  }
};

module.exports = {
  requireAuth
};
