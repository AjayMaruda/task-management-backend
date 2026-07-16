/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { HandleResponse, ResponseStatus } from "../utils/apiResponse";
import logger from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
  let errors = err.errors;

  if (err.name === "CastError") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const formattedField = field.replace(/_/g, " ");
    const capitalizedField =
      formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
    message = `${capitalizedField} already exists`;
  } else if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST;
    const validationErrors = Object.values(err.errors || {}).map(
      (el: any) => el.message,
    );
    message = `Validation failed: ${validationErrors.join(", ")}`;
    errors = err.errors;
  }

  if (statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
    logger.error({ err, url: req.originalUrl, method: req.method }, message);
  } else {
    logger.warn(
      { url: req.originalUrl, method: req.method, statusCode, message },
      "Client request warning",
    );
  }

  const isProduction = process.env.NODE_ENV === "production";
  const errorDetails =
    errors ||
    (statusCode >= StatusCodes.INTERNAL_SERVER_ERROR &&
    !isProduction &&
    err.stack
      ? { stack: err.stack }
      : undefined);

  const responseBody = HandleResponse(
    statusCode,
    statusCode >= 500 ? ResponseStatus.ERROR : ResponseStatus.FAIL,
    message,
    undefined,
    errorDetails,
  );

  res.status(statusCode).json(responseBody);
};
