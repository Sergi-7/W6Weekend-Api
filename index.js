require("dotenv").config();

const connectDB = require("./database");
const initializeServer = require("./server/index");

const port = process.env.SERVER_PORT;

(async () => {
  try {
    await connectDB();
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
