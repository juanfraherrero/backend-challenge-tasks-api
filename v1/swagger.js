const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Especificar la versión de OpenAPI utilizada
    info: {
      title: 'API de tareas',
      version: '1.0.0',
      description: 'Documentación de la API de tareas',
    },

  },
  apis: [
    './v1/routes/tasksRoutes.js',
    './v1/routes/usersRoutes.js',
  ],

};

const swaggerOptions = swaggerJSDoc(options);

module.exports = { swaggerOptions };
