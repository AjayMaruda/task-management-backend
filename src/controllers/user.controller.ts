import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async register(req: Request, res: Response) {
    const result = await UserService.createUser(req.body);
    res.status(result.statusCode).json(result);
  }

  static async login(req: Request, res: Response) {
    const result = await UserService.loginUser(req.body);
    res.status(result.statusCode).json(result);
  }

  static async getMe(req: Request, res: Response) {
    const result = await UserService.getUserById(req.params.id as string);
    res.status(result.statusCode).json(result);
  }

  static async list(req: Request, res: Response) {
    const result = await UserService.listOfUsers(req.body);
    res.status(result.statusCode).json(result);
  }

  static async update(req: Request, res: Response) {
    const result = await UserService.updateUser(
      req.params.id as string,
      req.body,
    );
    res.status(result.statusCode).json(result);
  }

  static async remove(req: Request, res: Response) {
    const result = await UserService.deleteUser(req.params.id as string);
    res.status(result.statusCode).json(result);
  }
}
