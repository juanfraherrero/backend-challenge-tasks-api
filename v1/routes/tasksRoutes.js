const express = require('express');

const router = express.Router();
const taskController = require('../controllers/taskController');
// importamos las validaciones
const {
  idValidation,
  nameDescriptionCompletedValidationForPOST,
  nameDescriptionCompletedValidationForPUT,
  validatePaginationSortingCompletedParams,
} = require('../validations/validations');

const authenticateToken = require('../middlewares/authenticateToken');
/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user name.
 *           example: jhondoe
 *         password:
 *           type: string
 *           description: The user password.
 *           example: pass1234
 *     User:
 *       type: object
 *       required:
 *         - _id
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *           example: 658e0e9220618a10cc2b0e06
 *         username:
 *           type: string
 *           description: The user name.
 *           example: jhondoe
 *     ArrayTasks:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Task'
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID.
 *           example: 658e0e9220618a10cc2b0e06
 *         name:
 *           type: string
 *           description: The task name.
 *           example: Tarea 1
 *         description:
 *           type: string
 *           description: The task description.
 *           example: Descripción de la tarea 1
 *         completed:
 *           type: boolean
 *           description: The task status.
 *           example: false
 *     NewTask:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The task name.
 *           example: Tarea 1
 *         description:
 *           type: string
 *           description: The task description.
 *           example: Descripción de la tarea 1
 *         completed:
 *           type: boolean
 *           description: The task status.
 *           example: false
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Endpoint to fetch all tasks.
 *       You can filter, paginate, and sort tasks using query parameters.
 *       sortBy and sortDirection must be used together or not used at all.
 *       Requires token for authentication.
 *     tags:
 *       - API v1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: completed
 *         in: query
 *         description: Filter tasks by completion status.
 *         required: false
 *         schema:
 *           type: boolean
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page.
 *         required: false
 *         schema:
 *           type: integer
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by (name, completed, description).
 *         required: false
 *         schema:
 *           type: string
 *       - name: sortDirection
 *         in: query
 *         description: Sort direction (asc or desc).
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *     responses:
 *       200:
 *         description: Returns all tasks.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArrayTasks'
 *       500:
 *         description: Error while fetching tasks.
 *         schema:
 *           type: string
 */
router.get('/tasks', authenticateToken, validatePaginationSortingCompletedParams, taskController.getAllTasks);

/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task. Requires token for authentication.
 *     tags:
 *      - API v1
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *           example:
 *            name: Tarea 1
 *            description: Descripción de la tarea 1
 *            completed: false
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Error while creating a new task.
 */
router.post('/tasks', authenticateToken, nameDescriptionCompletedValidationForPOST, taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve a task by its ID. Requires token for authentication.
 *     tags:
 *      - API v1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Error while fetching the task by ID.
 */
router.get('/tasks/:id', authenticateToken, idValidation, taskController.getTaskById);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update a task by its ID. Requires token for authentication.
 *     tags:
 *      - API v1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error or missing fields.
 *       404:
 *         description: Task not found for updating.
 *       500:
 *         description: Error while updating the task by ID.
 */
router.put('/tasks/:id', authenticateToken, idValidation, nameDescriptionCompletedValidationForPUT, taskController.updateTaskById);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete a task by its ID. Requires token for authentication.
 *     tags:
 *      - API v1
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found for deletion.
 *       500:
 *         description: Error while deleting the task by ID.
 */
router.delete('/tasks/:id', authenticateToken, idValidation, taskController.deleteTaskById);

module.exports = router;
