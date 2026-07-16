import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import * as mongoose from "mongoose";
import { User } from "../models/user.schema";
import { COMMON_MESSAGES } from "../utils/constants";

export interface AuthenticatedRequest extends Request {
  user?: mongoose.Document & InstanceType<typeof User>;
}

export const protect = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const err = new Error(COMMON_MESSAGES.NOT_AUTHORIZED) as Error & {
      statusCode?: number;
    };
    err.statusCode = StatusCodes.UNAUTHORIZED;
    return next(err);
  }

  try {
    const secret = process.env.JWT_SECRET || "secret_key";
    const decoded = jwt.verify(token, secret) as { id: string };

    const userDoc = await User.findById(decoded.id);
    if (!userDoc) {
      const err = new Error(COMMON_MESSAGES.USER_NOT_FOUND) as Error & {
        statusCode?: number;
      };
      err.statusCode = StatusCodes.UNAUTHORIZED;
      return next(err);
    }

    req.user = userDoc;
    next();
  } catch {
    const err = new Error(COMMON_MESSAGES.INVALID_TOKEN) as Error & {
      statusCode?: number;
    };
    err.statusCode = StatusCodes.UNAUTHORIZED;
    return next(err);
  }
};
