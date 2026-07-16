import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class TaskController {
  static async create(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const result = await TaskService.createTask({
      ...req.body,
      createdBy: authReq.user?._id,
    });
    res.status(result.statusCode).json(result);
  }

  static async list(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const result = await TaskService.listOfTasks({
      ...req.body,
      createdBy: authReq.user?._id,
    });
    res.status(result.statusCode).json(result);
  }

  static async update(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const result = await TaskService.updateTask(
      req.params.id as string,
      req.body,
      authReq.user?._id,
    );
    res.status(result.statusCode).json(result);
  }

  static async remove(req: Request, res: Response) {
    const authReq = req as AuthenticatedRequest;
    const result = await TaskService.deleteTask(
      req.params.id as string,
      authReq.user?._id,
    );
    res.status(result.statusCode).json(result);
  }
}
