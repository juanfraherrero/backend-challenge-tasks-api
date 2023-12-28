const { param, body } = require('express-validator');

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

module.exports = {
  idValidation,
  nameDescriptionCompletedValidationForPUT,
  nameDescriptionCompletedValidationForPOST,
};
