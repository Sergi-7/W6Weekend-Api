const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userid = user.id;
    next();
  } catch {
    const error = new Error("Invalid Token");
    error.code = 401;
    next(error);
  }
};

module.exports = auth;
