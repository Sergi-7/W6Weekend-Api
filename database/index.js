const debug = require("debug")("robots:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.red("No se ha podido iniciar la base de datos."));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Conectado a la base de datos"));
      resolve();
    });
  });

module.exports = connectDB;
