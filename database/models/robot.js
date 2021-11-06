const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
    speed: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    stamina: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
});

const Robot = model("Robot", robotSchema);

module.exports = Robot;
