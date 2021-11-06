const debug = require("debug")("robots:controller");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { idRobot } = req.params;

  try {
    const robot = await Robot.findById(idRobot);
    if (robot) {
      res.json(robot);
    } else {
      const error = new Error("Roboto not foundo");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 404;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "There was an error when trying to create a new roboto";
    next(error);
  }
};

const deleteRobotById = async (req, res, next) => {
  try {
    const { idRobot } = req.params;
    console.log(req.params);
    const deletedRobot = await Robot.findByIdAndDelete(idRobot);
    res.json({ delete: deletedRobot });
  } catch (error) {
    error.code = 400;
    error.message = "There was an error when attempting to delete a roboto";
    next(error);
  }
};

const updateRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const { _id } = robot;
    debug(_id);
    const updatedRobot = await Robot.findByIdAndUpdate(_id, robot);
    res.json(updatedRobot);
  } catch (error) {
    error.code = 400;
    error.message = "There was an error when attempting to update a roboto";
    next(error);
  }
};

module.exports = {
  getRobots,
  getRobotById,
  createRobot,
  deleteRobotById,
  updateRobot,
};
