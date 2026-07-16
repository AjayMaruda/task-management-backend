import { StatusCodes } from "http-status-codes";
import { Document } from "mongoose";
import { Task } from "../models/task.schema";
import { User } from "../models/user.schema";
import { CreateTaskDTO, UpdateTaskDTO, ListTasksDTO } from "../dtos/task.dto";
import { COMMON_MESSAGES } from "../utils/constants";
import { ITask, TaskFilter } from "../interfaces/task.interface";
import { HandleResponse, ResponseStatus } from "../utils/apiResponse";

export class TaskService {
  static async createTask(dto: CreateTaskDTO) {
    if (dto.assignee) {
      const userExists = await User.findOne({
        _id: dto.assignee,
        is_deleted: false,
      });
      if (!userExists) {
        return HandleResponse(
          StatusCodes.NOT_FOUND,
          ResponseStatus.FAIL,
          COMMON_MESSAGES.USER_NOT_FOUND,
        );
      }
    }

    const newTask = await Task.create({
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      assignee: dto.assignee || null,
    });

    return HandleResponse(
      StatusCodes.CREATED,
      ResponseStatus.SUCCESS,
      COMMON_MESSAGES.DATA_SAVED,
      { taskId: newTask._id },
    );
  }

  static async listOfTasks(dto: ListTasksDTO) {
    const page = Number(dto.page) || 1;
    const limit = Number(dto.limit) || 10;
    const search = dto.search;
    const status = dto.status;
    const priority = dto.priority;
    const assignee = dto.assignee;
    const sortKey = dto.sortKey || "createdAt";
    const sortValue = dto.sortValue === "asc" ? 1 : -1;

    const filter: TaskFilter = { is_deleted: false };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (assignee) {
      filter.assignee = assignee;
    }

    const items = await Task.find(filter)
      .populate("assignee", "name email phone")
      .sort({ [sortKey]: sortValue })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await Task.countDocuments(filter);

    const formattedItems = items.map((item, index) => {
      const taskObj = (item as Document).toObject() as ITask;
      return {
        srno: (page - 1) * limit + index + 1,
        ...taskObj,
      };
    });

    const data = {
      list: formattedItems,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit) || 1,
    };

    return HandleResponse(
      StatusCodes.OK,
      ResponseStatus.SUCCESS,
      undefined,
      data,
    );
  }

  static async updateTask(id: string, dto: UpdateTaskDTO) {
    if (dto.assignee) {
      const userExists = await User.findOne({
        _id: dto.assignee,
        is_deleted: false,
      });
      if (!userExists) {
        return HandleResponse(
          StatusCodes.NOT_FOUND,
          ResponseStatus.FAIL,
          COMMON_MESSAGES.USER_NOT_FOUND,
        );
      }
    }

    const updateFields = { ...dto } as Record<string, unknown>;
    if (dto.dueDate) {
      updateFields.dueDate = new Date(dto.dueDate);
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { $set: updateFields },
      { new: true },
    );

    if (!task) {
      return HandleResponse(
        StatusCodes.NOT_FOUND,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.DATA_NOT_FOUND,
      );
    }

    return HandleResponse(
      StatusCodes.OK,
      ResponseStatus.SUCCESS,
      COMMON_MESSAGES.DATA_UPDATED,
      {
        taskId: task._id,
      },
    );
  }

  static async deleteTask(id: string) {
    const task = await Task.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { $set: { is_deleted: true, deletedAt: new Date() } },
      { new: true },
    );

    if (!task) {
      return HandleResponse(
        StatusCodes.NOT_FOUND,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.DATA_NOT_FOUND,
      );
    }

    return HandleResponse(
      StatusCodes.OK,
      ResponseStatus.SUCCESS,
      COMMON_MESSAGES.DATA_DELETED,
    );
  }
}
