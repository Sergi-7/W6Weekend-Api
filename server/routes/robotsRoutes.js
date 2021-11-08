const express = require("express");
const auth = require("../middleware/index");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobotById,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", auth, getRobots);

router.get("/:idRobot", auth, getRobotById);

router.post("/create", auth, createRobot);

router.put("/update", auth, updateRobot);

router.delete("/delete/:idRobot", auth, deleteRobotById);

module.exports = router;
