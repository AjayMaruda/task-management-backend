import mongoose from "mongoose";
import logger from "../utils/logger";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      logger.error("MONGO_URI is missing from environment variables");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    logger.info("Connected to MongoDB successfully");
  } catch (error) {
    logger.error(error, "Database connection failed");
    process.exit(1);
  }
};
