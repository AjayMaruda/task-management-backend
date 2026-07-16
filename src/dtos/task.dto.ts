import { Types } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTaskDTO:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           example: "Implement tasks endpoint"
 *         description:
 *           type: string
 *           example: "Build schemas, services, controllers, validations, and routes"
 *         status:
 *           type: string
 *           enum: [todo, in_progress, completed]
 *           example: "todo"
 *           default: "todo"
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: "medium"
 *           default: "medium"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           example: "2026-07-20T18:00:00.000Z"
 *         assignee:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *
 *     UpdateTaskDTO:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Implement tasks endpoint"
 *         description:
 *           type: string
 *           example: "Build schemas, services, controllers, validations, and routes"
 *         status:
 *           type: string
 *           enum: [todo, in_progress, completed]
 *           example: "in_progress"
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: "high"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           example: "2026-07-25T18:00:00.000Z"
 *         assignee:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *
 *     ListTasksDTO:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *           default: 1
 *         limit:
 *           type: integer
 *           example: 10
 *           default: 10
 *         sortKey:
 *           type: string
 *           example: "createdAt"
 *           default: "createdAt"
 *         sortValue:
 *           type: string
 *           enum: [asc, desc]
 *           example: "desc"
 *           default: "desc"
 *         search:
 *           type: string
 *           example: "Implement"
 *         status:
 *           type: string
 *           enum: [todo, in_progress, completed]
 *           example: "todo"
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: "medium"
 *         assignee:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 */

export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: "todo" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  dueDate?: string | Date | null;
  assignee?: string | null;
  createdBy?: string | Types.ObjectId;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: "todo" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  dueDate?: string | Date | null;
  assignee?: string | null;
}

export interface ListTasksDTO {
  page?: string | number;
  limit?: string | number;
  sortKey?: string;
  sortValue?: "asc" | "desc";
  search?: string;
  status?: "todo" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  assignee?: string;
  createdBy?: string | Types.ObjectId;
}
