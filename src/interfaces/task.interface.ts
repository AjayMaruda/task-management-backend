import { Types } from "mongoose";
import { IUser } from "./user.interface";

export interface ITask {
  _id: Types.ObjectId | string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: Date | null;
  assignee?: Types.ObjectId | string | IUser | null;
  is_deleted: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskFilter {
  is_deleted: boolean;
  assignee?: Types.ObjectId | string;
  status?: "todo" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  $or?: Array<{
    title?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
  }>;
}

export interface ListTasksResponse {
  list: Array<ITask & { srno: number }>;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
