import { Response } from "express";

export enum ResponseStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}

export function handleResponse<T = unknown>(
  res: Response,
  statusCode: number,
  status: ResponseStatus,
  message?: string,
  data?: T,
  error?: unknown,
): Response {
  const success = status === ResponseStatus.SUCCESS;

  const responsePayload = {
    statusCode,
    success,
    status,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(error !== undefined ? { error } : {}),
  };

  return res.status(statusCode).json(responsePayload);
}

export function sendSuccess<T = unknown>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
): Response {
  return handleResponse(res, statusCode, ResponseStatus.SUCCESS, message, data);
}

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  error?: unknown,
): Response {
  const status = statusCode >= 500 ? ResponseStatus.ERROR : ResponseStatus.FAIL;
  return handleResponse(res, statusCode, status, message, undefined, error);
}
