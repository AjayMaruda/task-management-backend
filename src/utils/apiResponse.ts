import { StatusCodes } from "http-status-codes";

export enum ResponseStatus {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}

export function HandleResponse<T = unknown>(
  statusCode: number,
  status: ResponseStatus,
  message?: string,
  data?: T,
  error?: unknown,
) {
  return {
    statusCode:
      statusCode ??
      (status === ResponseStatus.SUCCESS
        ? StatusCodes.OK
        : StatusCodes.INTERNAL_SERVER_ERROR),
    status,
    message,
    data,
    error,
  };
}
