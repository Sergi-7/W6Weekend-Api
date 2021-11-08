const express = require("express");
const loginUser = require("../controller/usersController");

const router = express.Router();

// router.get("/", async () => {
//   User.create({
//     name: "Sergi",
//     username: "Sergi",
//     password: await bcrypt.hash("sergi7", 10),
//   });
// });

router.post("/login", loginUser);
module.exports = router;
