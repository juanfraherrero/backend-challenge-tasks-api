# AppeironGlobalSolutions backend-challenges

Node.js server with MongoDB, Express, and RESTful API for task management. Features data validation, Jest testing, JWT authentication, and Swagger documentation.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Uso](#uso)
- [Documentación](#documentación)
- [Challenge](#challenge)

## Introducción

Este proyecto consiste en un servidor Node.js que utiliza MongoDB como base de datos y Express para crear una API RESTful destinada a la gestión de tareas. La aplicación incluye funcionalidades de validación de datos, pruebas con Jest para garantizar su robustez, autenticación JWT para seguridad y documentación detallada mediante Swagger.

## Características

- **Gestión de tareas**: Crear, borrar y modificar tareas.
- **Autenticación de usuarios**: Registro e inicio de sesión de usuarios.

## Instalación

Para instalar todas las dependencias del proyecto, sigue estos pasos:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/juanfraherrero/backend-challenge-tasks-api
    cd backend-challenge-tasks-api
    npm install
    ```

## Variables de Entorno

El proyecto requiere el establecimiento de las siguientes variables de entorno en un archivo `.env` local para funcionar correctamente:

- **PORT**: El número de puerto en el que se ejecutará el servidor localmente. Default 3000
- **MONGODB_URI**: La URI de conexión a la base de datos MongoDB. **Requerido**
- **SECRET_KEY_JWT**: Clave secreta utilizada para firmar los tokens JWT de autenticación. **Requerido**
  
Asegúrate de configurar estas variables de entorno antes de iniciar el proyecto localmente.

## Uso

La API cuenta con los siguientes endpoints:

- **GET /api/v1/tasks**:
  - Obtener tareas: Puedes filtrar, ordenar y paginar.
- **POST /api/v1/tasks**:
  - Crear una nueva tarea.
- **GET /api/v1/tasks/:id**:
  - Obtener una tarea específica por su ID.
- **PUT /api/v1/tasks/:id**:
  - Actualizar una tarea específica por su ID.
- **POST /api/v1/login**:
  - Iniciar sesión para obtener un token JWT.
- **POST /api/v1/register**:
  - Registrar un nuevo usuario.

## Documentación

La API está documentada con Swagger y se puede acceder a la documentación a través de:

- **/api/v1/api-doc**: Accede a la documentación detallada de la API utilizando Swagger.

## Challenge

Implement a Node.js server that provides a RESTful API for managing a list of tasks. The server should persist the tasks in a MongoDB database. The API should support the following operations:

-   `GET /tasks`: Retrieve a list of all tasks. The list should be returned in JSON format.
-   `POST /tasks`: Create a new task. The request body should contain the task details in JSON format. The task should have the following fields:
    -   `name`: The name of the task (required).
    -   `description`: A description of the task (optional).
    -   `completed`: A boolean indicating whether the task has been completed (default: false).
-   `GET /tasks/:id`: Retrieve a single task by ID. The task should be returned in JSON format.
-   `PUT /tasks/:id`: Update a single task by ID. The request body should contain the updated task details in JSON format.
-   `DELETE /tasks/:id`: Delete a single task by ID.

### Requirements
------------

-   The server should listen on port 3000.
-   The API should support the above operations using the appropriate HTTP methods (e.g. `GET`, `POST`, `PUT`, `DELETE`).
-   The API should validate the request data and return appropriate error messages if the data is invalid. For example, if a `POST` request to create a new task is missing the required `name` field, the API should return a 400 Bad Request response.
-   The API should use MongoDB to store and retrieve the tasks. You may use the MongoDB driver for Node.js or a MongoDB ODM (Object Document Mapper) like Mongoose.
-   Use the Express.js framework to build the server.
-   Use the [Express Validator](https://express-validator.github.io/docs/) middleware to validate the request data.
-   Use [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest) to write automated tests for the API.

### Bonus
-----

-   Use [ESLint](https://eslint.org/) to lint the code and enforce a consistent style. Airbnb style guide.
-   Use [Prettier](https://prettier.io/) to automatically format the code according to a consistent style.
-   Use [Swagger](https://swagger.io/) or [JSDoc](http://usejsdoc.org/) to document the API.
-   Add authentication to the API using JSON Web Tokens (JWTs). Require a valid JWT to access any of the API endpoints.
-   Implement filtering, pagination, and sorting for the `GET /tasks` endpoint. Allow the client to specify query parameters to filter the tasks by completion status, to paginate through the results, and to sort the results by a specific field.

