import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
  phone: string;
  is_deleted: boolean;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserFilter {
  is_deleted: boolean;
  $or?: Array<{
    name?: { $regex: string; $options: string };
    email?: { $regex: string; $options: string };
    phone?: { $regex: string; $options: string };
  }>;
}

export interface ListUsersResponse {
  list: Array<Omit<IUser, "password"> & { srno: number }>;
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface LoginResponse {
  user: Omit<IUser, "password">;
  token: string;
}
