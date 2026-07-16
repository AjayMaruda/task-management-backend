import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";
import {
  validateCreateTask,
  validateUpdateTask,
} from "../middleware/validation.middleware";

const taskRouter = Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskDTO'
 *     responses:
 *       201:
 *         description: Task successfully created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 * /api/tasks/list:
 *   post:
 *     summary: Get a list of tasks with search, pagination, and filters
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListTasksDTO'
 *     responses:
 *       200:
 *         description: Returns paginated list of tasks
 *       401:
 *         description: Unauthorized
 *
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskDTO'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *
 *   delete:
 *     summary: Soft delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
taskRouter.post("/", protect, validateCreateTask, TaskController.create);
taskRouter.post("/list", protect, TaskController.list);
taskRouter.put("/:id", protect, validateUpdateTask, TaskController.update);
taskRouter.delete("/:id", protect, TaskController.remove);

export { taskRouter };
