import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
  static async create(req: Request, res: Response) {
    const result = await TaskService.createTask(req.body);
    res.status(result.statusCode).json(result);
  }

  static async list(req: Request, res: Response) {
    const result = await TaskService.listOfTasks(req.body);
    res.status(result.statusCode).json(result);
  }

  static async update(req: Request, res: Response) {
    const result = await TaskService.updateTask(
      req.params.id as string,
      req.body,
    );
    res.status(result.statusCode).json(result);
  }

  static async remove(req: Request, res: Response) {
    const result = await TaskService.deleteTask(req.params.id as string);
    res.status(result.statusCode).json(result);
  }
}
