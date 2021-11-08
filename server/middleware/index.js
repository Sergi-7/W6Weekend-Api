const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error("There is no token");
    error.code = 500;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.username = user.username;
      next();
    } catch {
      const error = new Error("Invalid Token");
      error.code = 401;
      next(error);
    }
  }
};

module.exports = auth;
