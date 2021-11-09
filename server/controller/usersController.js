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

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const correctPassword = await bcrypt.compare(password, user.password);
  if (correctPassword) {
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    res.json({ accessToken });
  } else {
    const error = new Error("Invalid Credentials");
    error.code = 401;
    next(error);
  }
};

module.exports = loginUser;
