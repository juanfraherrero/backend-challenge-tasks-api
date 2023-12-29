# AppeironGlobalSolutions backend-challenges

Node.js server with MongoDB, Express, and RESTful API for task management. Features data validation, Jest testing, JWT authentication, and Swagger documentation.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Uso](#uso)
- [Documentación](#documentación)

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

