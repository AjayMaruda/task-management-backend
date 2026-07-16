import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.schema";
import {
  CreateUserDTO,
  UpdateUserDTO,
  ListUsersDTO,
  LoginDTO,
} from "../dtos/user.dto";
import { COMMON_MESSAGES } from "../utils/constants";
import { IUser, UserFilter } from "../interfaces/user.interface";
import { HandleResponse, ResponseStatus } from "../utils/apiResponse";

export class UserService {
  static async createUser(dto: CreateUserDTO) {
    const { email } = dto;
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      is_deleted: false,
    });

    if (existingUser) {
      return HandleResponse(
        StatusCodes.CONFLICT,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.DATA_ALREADY_EXISTS,
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(dto.password || "", salt);

    const newUser = await User.create({
      ...dto,
      password: hashedPassword,
    });

    return HandleResponse(
      StatusCodes.CREATED,
      ResponseStatus.SUCCESS,
      COMMON_MESSAGES.USER_REGISTERED,
      { userId: newUser._id },
    );
  }

  static async listOfUsers(query: ListUsersDTO) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search;

    const filter: UserFilter = { is_deleted: false };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const items = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await User.countDocuments(filter);

    const formattedItems = items.map((item, index) => {
      const userObj = item.toObject() as IUser;
      return {
        srno: (page - 1) * limit + index + 1,
        ...userObj,
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

  static async updateUser(id: string, dto: UpdateUserDTO) {
    const user = await User.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { $set: dto },
      { new: true },
    );

    if (!user) {
      return HandleResponse(
        StatusCodes.NOT_FOUND,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.USER_NOT_FOUND,
      );
    }

    return HandleResponse(
      StatusCodes.OK,
      ResponseStatus.SUCCESS,
      COMMON_MESSAGES.DATA_UPDATED,
      {
        userId: user._id,
      },
    );
  }

  static async deleteUser(id: string) {
    const user = await User.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { $set: { is_deleted: true, deletedAt: new Date() } },
      { new: true },
    );

    if (!user) {
      return HandleResponse(
        StatusCodes.NOT_FOUND,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.USER_NOT_FOUND,
      );
    }

    return HandleResponse(
      StatusCodes.OK,
      ResponseStatus.SUCCESS,
      COMMON_MESSAGES.DATA_DELETED,
    );
  }

  static async getUserById(id: string) {
    const user = await User.findOne({ _id: id, is_deleted: false });

    if (!user) {
      return HandleResponse(
        StatusCodes.NOT_FOUND,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.USER_NOT_FOUND,
      );
    }

    return HandleResponse(StatusCodes.OK, ResponseStatus.SUCCESS, undefined, {
      user,
    });
  }

  static async loginUser(dto: LoginDTO) {
    const user = await User.findOne({
      email: dto.email.toLowerCase(),
      is_deleted: false,
    }).select("+password");

    if (!user) {
      return HandleResponse(
        StatusCodes.UNAUTHORIZED,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.INVALID_CREDENTIALS,
      );
    }

    const isMatch = await bcryptjs.compare(dto.password || "", user.password);
    if (!isMatch) {
      return HandleResponse(
        StatusCodes.UNAUTHORIZED,
        ResponseStatus.FAIL,
        COMMON_MESSAGES.INVALID_CREDENTIALS,
      );
    }

    const secret = process.env.JWT_SECRET!;
    const expire = process.env.JWT_EXPIRE;
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      secret,
      {
        expiresIn: expire as jwt.SignOptions["expiresIn"],
      },
    );

    return HandleResponse(
      StatusCodes.OK,
      ResponseStatus.SUCCESS,
      COMMON_MESSAGES.LOGIN_SUCCESSFUL,
      {
        token,
      },
    );
  }
}
