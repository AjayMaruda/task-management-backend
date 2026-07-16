import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middleware/errorHandler";
import { authRouter, userRouter } from "./routes/user.routes";
import { taskRouter } from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use((req, _res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as Error & {
    statusCode?: number;
  };
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

export default app;
