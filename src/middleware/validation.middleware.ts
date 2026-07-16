import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationError } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { COMMON_MESSAGES } from "../utils/constants";

const handleValidation = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMap: Record<string, string> = {};
    errors.array().forEach((err: ValidationError) => {
      if (err.type === "field" && !errorMap[err.path]) {
        errorMap[err.path] = err.msg;
      }
    });

    const errorMsg = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    const err = new Error(errorMsg) as Error & {
      statusCode?: number;
      errors?: Record<string, string>;
    };
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.errors = errorMap;
    return next(err);
  }
  next();
};

export const validateRegister = [
  body("name").trim().notEmpty().withMessage(COMMON_MESSAGES.NAME_REQUIRED),
  body("email").trim().isEmail().withMessage(COMMON_MESSAGES.INVALID_EMAIL),
  body("phone")
    .trim()
    .isLength({ min: 10 })
    .withMessage(COMMON_MESSAGES.INVALID_PHONE),
  body("password")
    .notEmpty()
    .withMessage(COMMON_MESSAGES.PASSWORD_REQUIRED)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/)
    .withMessage(COMMON_MESSAGES.PASSWORD_INVALID),
  handleValidation,
];

export const validateCreateTask = [
  body("title").trim().notEmpty().withMessage(COMMON_MESSAGES.TITLE_REQUIRED),
  body("status")
    .optional()
    .isIn(["todo", "in_progress", "completed"])
    .withMessage(COMMON_MESSAGES.INVALID_STATUS),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage(COMMON_MESSAGES.INVALID_PRIORITY),
  body("dueDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage(COMMON_MESSAGES.INVALID_DUE_DATE),
  body("assignee")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage(COMMON_MESSAGES.INVALID_ASSIGNEE),
  handleValidation,
];

export const validateUpdateTask = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(COMMON_MESSAGES.TITLE_CANNOT_BE_EMPTY),
  body("status")
    .optional()
    .isIn(["todo", "in_progress", "completed"])
    .withMessage(COMMON_MESSAGES.INVALID_STATUS),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage(COMMON_MESSAGES.INVALID_PRIORITY),
  body("dueDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage(COMMON_MESSAGES.INVALID_DUE_DATE),
  body("assignee")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage(COMMON_MESSAGES.INVALID_ASSIGNEE),
  handleValidation,
];
