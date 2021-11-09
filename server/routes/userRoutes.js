const express = require("express");
const { validate } = require("express-validation");
const loginUser = require("../controller/usersController");
const requestSchema = require("../schemas/requestSchema");

const router = express.Router();

// router.get("/", async () => {
//   User.create({
//     name: "Sergi",
//     username: "Sergi",
//     password: await bcrypt.hash("sergi7", 10),
//   });
// });

router.post("/login", validate(requestSchema), loginUser);
module.exports = router;
