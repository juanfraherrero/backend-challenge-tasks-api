const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const { validateUsernamePassword } = require('../validations/validations');

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully registered
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request due to invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', validateUsernamePassword, userController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in as a user
 *     description: Endpoint to log in as a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       '200':
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully logged in
 *                 token:
 *                   type: string
 *                   example: JWT token for authentication.
 *       '401':
 *         description: Invalid credentials.
 *       '500':
 *         description: Internal server error.
 */
router.post('/login', validateUsernamePassword, userController.login);

module.exports = router;
