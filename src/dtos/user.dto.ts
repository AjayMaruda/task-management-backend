/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           example: "1234567890"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *
 *     UpdateUserDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           example: "1234567890"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *
 *     LoginDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *
 *     ListUsersDTO:
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
 *           example: "John"
 */

export interface CreateUserDTO {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export interface UpdateUserDTO {
  name?: string;
  phone?: string;
  email?: string;
}

export interface ListUsersDTO {
  page?: string | number;
  limit?: string | number;
  sortKey?: string;
  sortValue?: "asc" | "desc";
  search?: string;
}

export interface LoginDTO {
  email: string;
  password?: string;
}
