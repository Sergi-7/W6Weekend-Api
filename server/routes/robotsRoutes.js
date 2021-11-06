const express = require("express");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobotById,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", createRobot);

router.put("/update", updateRobot);

router.delete("/delete/:idRobot", deleteRobotById);

module.exports = router;
