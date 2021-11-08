const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

// const createUser = async (req, res) => {
//   console.log("AAAAA");
//   const newUser = await User.create({
//     name: "Sergi",
//     username: "Sergi",
//     password: await bcrypt.hash("sergi7", 10),
//   });
//   res.json(newUser);
// };

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne(username);
  console.log(user);
  const correctPassword = bcrypt.compare(password, user.password);
  const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
  res.json(accessToken);
};

module.exports = loginUser;
