const { param, body, query } = require('express-validator');

// Validaciones para el parámetro 'id'
const idValidation = [
  param('id', 'ID de tarea inválido').exists().isMongoId(),
];

const nameDescriptionCompletedValidationForPUT = [
  body('name').optional()
    .escape(),
  body('description').optional()
    .isLength({ min: 0, max: 200 }).withMessage('La descripción debe tener hasta máximo 200 caracteres')
    .escape(),
  body('completed').optional()
    .isBoolean().withMessage('El campo "completed" debe ser un valor booleano')
    .escape(),
];
const nameDescriptionCompletedValidationForPOST = [
  body('name', 'El campo "name" es requerido').exists()
    .escape(),
  body('description').optional()
    .isLength({ min: 0, max: 200 }).withMessage('La descripción debe tener hasta máximo 200 caracteres')
    .escape(),
  body('completed', 'El campo "completed" es requerido').exists()
    .isBoolean().withMessage('El campo "completed" debe ser un valor booleano')
    .escape(),
];

const validatePaginationSortingCompletedParams = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page debe ser un número entero positivo'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit debe ser un número entero positivo'),
  query('sortBy').optional().isIn(['name', 'completed', 'description']).withMessage('sortBy debe ser "name" o "completed" o "description"'),
  query('sortDirection').optional().isIn(['asc', 'desc']).withMessage('sortDirection debe ser "asc" o "desc"'),
  query('completed').optional().isBoolean().withMessage('El parámetro "completed" debe ser un booleano'),
];

module.exports = {
  idValidation,
  nameDescriptionCompletedValidationForPUT,
  nameDescriptionCompletedValidationForPOST,
  validatePaginationSortingCompletedParams,
};
