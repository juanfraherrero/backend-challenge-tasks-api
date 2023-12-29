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

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Endpoint to fetch all tasks.
 *       You can filter, paginate, and sort tasks using query parameters.
 *       sortBy and sortDirection must be used together or not used at all.
 *     tags:
 *       - API v1
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
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Returns all tasks.
 *       500:
 *         description: Error while fetching tasks.
 */
router.get('/tasks', validatePaginationSortingCompletedParams, taskController.getAllTasks);

/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task.
 *     tags:
 *      - API v1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Error while creating a new task.
 */
router.post('/tasks', nameDescriptionCompletedValidationForPOST, taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve a task by its ID.
 *     tags:
 *      - API v1
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
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Error while fetching the task by ID.
 */
router.get('/tasks/:id', idValidation, taskController.getTaskById);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Update a task by its ID.
 *     tags:
 *      - API v1
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Validation error or missing fields.
 *       404:
 *         description: Task not found for updating.
 *       500:
 *         description: Error while updating the task by ID.
 */
router.put('/tasks/:id', idValidation, nameDescriptionCompletedValidationForPUT, taskController.updateTaskById);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Delete a task by its ID.
 *     tags:
 *      - API v1
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
router.delete('/tasks/:id', idValidation, taskController.deleteTaskById);

module.exports = router;
