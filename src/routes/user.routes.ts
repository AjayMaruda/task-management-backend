import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";
import { validateRegister } from "../middleware/validation.middleware";

const authRouter = Router();
const userRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict (Email already exists)
 *
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Login successful, returns token
 *       401:
 *         description: Unauthorized (Invalid credentials)
 */
authRouter.post("/register", validateRegister, UserController.register);
authRouter.post("/login", UserController.login);

/**
 * @swagger
 * /api/users/me/{id}:
 *   get:
 *     summary: Get profile of user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Returns user profile
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *
 * /api/users/list:
 *   post:
 *     summary: Get a list of users with search and pagination
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListUsersDTO'
 *     responses:
 *       200:
 *         description: Returns paginated user list
 *       401:
 *         description: Unauthorized
 *
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDTO'
 *     responses:
 *       202:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already taken
 *
 *   delete:
 *     summary: Soft delete a user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.get("/me/:id", protect, UserController.getMe);
userRouter.post("/list", protect, UserController.list);
userRouter.put("/:id", protect, UserController.update);
userRouter.delete("/:id", protect, UserController.remove);

export { authRouter, userRouter };
