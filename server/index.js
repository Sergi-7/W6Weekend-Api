const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { validate } = require("express-validation");
const auth = require("./middleware/index");
const { notFoundErrorHandler, generalErrorHandler } = require("./errors");
const robotsRoutes = require("./routes/robotsRoutes");
const userRoutes = require("./routes/userRoutes");
const requestSchema = require("./schemas/requestSchema");

const app = express();

app.use(cors());
app.use(express.json());

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Ha habido un error al iniciar el servidor."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} está en uso.`));
    }
  });
};

app.use(morgan("dev"));
app.use("/users", validate(requestSchema), userRoutes);
app.use("/robots", auth, robotsRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
