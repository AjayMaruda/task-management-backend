import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import logger from "./utils/logger";

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  app.listen(port, () => {
    logger.info(
      `Server listening on port ${port} in ${process.env.NODE_ENV || "development"} mode`,
    );
    logger.info(`API docs available at http://localhost:${port}/api-docs`);
  });
};

process.on("unhandledRejection", (err) => {
  logger.error(err, "Unhandled promise rejection detected");
  process.exit(1);
});

start();
