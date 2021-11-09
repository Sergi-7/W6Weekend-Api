const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
require("dotenv").config();

// const createUser = async (req, res) => {
//   console.log("AAAAA");
//   const newUser = await User.create({
//     name: "Sergi",
//     username: "Sergi",
//     password: await bcrypt.hash("sergi7", 10),
//   });
//   res.json(newUser);
// };

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("User non existant");
    error.code = 401;
    next(error);
  } else {
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      const error = new Error("Wrong credentials");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET
      );
      res.json({ token });
    }
  }
};

module.exports = loginUser;
