const { param, body, query } = require('express-validator');

// Validaciones para el parámetro 'id'
const idValidation = [
  param('id', 'Invalid task ID').exists().isMongoId(),
];

const nameDescriptionCompletedValidationForPUT = [
  body('name').optional()
    .escape(),
  body('description').optional()
    .isLength({ min: 0, max: 200 }).withMessage('Description must be up to 200 characters maximum')
    .escape(),
  body('completed').optional()
    .isBoolean().withMessage('The "completed" field must be a boolean value')
    .escape(),
];

const nameDescriptionCompletedValidationForPOST = [
  body('name', 'The "name" field is required').exists()
    .escape(),
  body('description').optional()
    .isLength({ min: 0, max: 200 }).withMessage('Description must be up to 200 characters maximum')
    .escape(),
  body('completed', 'The "completed" field is required').exists()
    .isBoolean().withMessage('The "completed" field must be a boolean value')
    .escape(),
];

const validatePaginationSortingCompletedParams = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer number'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer number'),
  query('sortBy').optional().isIn(['name', 'completed', 'description']).withMessage('sortBy must be "name" or "completed" or "description"'),
  query('sortDirection').optional().isIn(['asc', 'desc']).withMessage('sortDirection must be "asc" or "desc"'),
  query('completed').optional().isBoolean().withMessage('The "completed" parameter must be a boolean'),
];

const validateUsernamePassword = [
  body('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  idValidation,
  nameDescriptionCompletedValidationForPUT,
  nameDescriptionCompletedValidationForPOST,
  validatePaginationSortingCompletedParams,
  validateUsernamePassword,
};
