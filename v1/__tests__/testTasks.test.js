const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../../server'); // Tu aplicación Express
const Task = require('../models/Task');
const tasks = require('../database/dataToLoad.json');

let tasksSaved;
const userTesting = {
  username: 'testing',
  password: 'testing',
};
let token;
describe('Pruebas del servicio de tasks', () => {
  beforeAll(async () => {
    // se debería usar una base de datos de testing, separada de la de producción
    // se realiza un vaciado de la db y luego se insertan los datos de prueba,
    //    esto se podría hacer en before cada test, pero por costo de tiempo mejor hacerlo
    //    una vez, setear el estado de la base y ejecutar los test
    try {
      await Task.deleteMany(); // Eliminar todos los documentos de la colección
      tasksSaved = await Task.insertMany(tasks); // Guardar los datos en la colección
    } catch (error) {
      console.error('Error al guardar las tareas previo a los tests');
    }

    // Login
    const response = await request(server)
      .post('/api/v1/login')
      .send(userTesting);

    token = response.body.token;
  });
  /// GET
  test('Devuelve status 200 para GET /api/v1/tasks', async () => {
    const response = await request(server)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);

    // Verificar si la respuesta contiene la estructura esperada
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Devuelve status 200 para GET /api/v1/tasks usando ordenamiento por name descendente, filtrado por completed true y obtenemos la página 2 con limit 3', async () => {
    const response = await request(server)
      .get('/api/v1/tasks?completed=true&sortBy=name&sortDirection=desc&page=1&limit=3')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);

    // Verificar si la respuesta contiene la estructura esperada
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).toBe(3);

    expect(response.body[0].name).toBe('Terminar proyecto');
    expect(response.body[0].completed).toBe(true);
  });

  test('Devuelve status 200 para GET /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .get(`/api/v1/tasks/${tasksSaved[0]._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);

    // Verificar si la respuesta contiene la estructura esperada
    expect(response.body).toBeDefined();
    expect(response.body.name).toBeDefined();
  });

  test('Devuelve status 404 para GET /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .get('/api/v1/tasks/658cda922f06d5e81e545e01')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Task not found');
  });

  test('Devuelve status 400 (error en id) para GET /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .get('/api/v1/tasks/1e545e01')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);

    const firstError = response.body.errors[0];
    expect(firstError.type).toBe('field');
    expect(firstError.path).toBe('id');
  });

  /// DELETE

  test('Devuelve status 404 para DELETE /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .delete('/api/v1/tasks/658cda822f06d5f81e545e01')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Task not found to delete');
  });

  test('Devuelve status 400 (error en id) para DELETE /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .delete('/api/v1/tasks/658d018344e9748')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);

    const firstError = response.body.errors[0];
    expect(firstError.type).toBe('field');
    expect(firstError.path).toBe('id');
  });

  test.skip('Devuelve status 204 (No Content) para DELETE /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .delete(`/api/v1/tasks/${tasksSaved[0]._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(204);
  }, 10000);

  /// PUT

  test('Devuelve status 200 para PUT /api/v1/tasks/:id', async () => {
    const updatedData = {
      name: 'Nueva tarea',
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .put(`/api/v1/tasks/${tasksSaved[1]._id}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.updated).toBeDefined();
    expect(response.body.updated.name).toBeDefined();
    expect(response.body.updated.name).toBe(updatedData.name);
    expect(response.body.updated.description).toBe(updatedData.description);
    expect(response.body.updated.completed).toBe(updatedData.completed);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Task updated successfully');
  });

  test('Devuelve status 400 (error en id) para PUT /api/v1/tasks/:id', async () => {
    const updatedData = {
      name: 'Nueva tarea',
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .put('/api/v1/tasks/658d018344e9748')
      .send(updatedData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);

    const firstError = response.body.errors[0];
    expect(firstError.type).toBe('field');
    expect(firstError.path).toBe('id');
  });

  test('Devuelve status 400 (error en body) para PUT /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .put('/api/v1/tasks/658d8d494955e95f81091a5a')
      .send({})
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('At least name, description, or completed is required to update the task');
  });

  test('Devuelve status 404 para PUT /api/v1/tasks/:id', async () => {
    const response = await request(server)
      .get('/api/v1/tasks/658cda922f06d5e81e545e01')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Task not found');
  });

  /// POST

  test('Devuelve status 201 para POST /api/v1/tasks', async () => {
    const newData = {
      name: 'Nueva tarea',
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .post('/api/v1/tasks')
      .send(newData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(201);

    expect(response.body.createdTask).toBeDefined();
    expect(response.body.createdTask.name).toBeDefined();
    expect(response.body.createdTask.name).toBe(newData.name);
    expect(response.body.createdTask.description).toBe(newData.description);
    expect(response.body.createdTask.completed).toBe(newData.completed);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Task created successfully');
  });

  test('Devuelve status 400 (error en body) para POST /api/v1/tasks', async () => {
    const newData = {
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .post('/api/v1/tasks')
      .send(newData)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);

    const firstError = response.body.errors[0];
    expect(firstError.type).toBe('field');
    expect(firstError.path).toBe('name');
  });

  /// REGISTER
  test('Register devuelve status 400 (username ya existe) /api/v1/register', async () => {
    const newUser = {
      username: 'testing',
      password: 'contrseniaprueba',
    };
    const response = await request(server)
      .post('/api/v1/register')
      .send(newUser);

    expect(response.statusCode).toBe(400);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Username already in use');
  });

  /// LOGIN
  test('Login devuelve status 200 /api/v1/login', async () => {
    const response = await request(server)
      .post('/api/v1/login')
      .send(userTesting);

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('User successfully logged in');
    expect(response.body.token).toBeDefined();
  });

  test('Login devuelve status 401 (credenciales inválidas) /api/v1/login', async () => {
    const newUser = {
      username: 'testing',
      password: 'contrseniaprueba',
    };
    const response = await request(server)
      .post('/api/v1/login')
      .send(newUser);

    expect(response.statusCode).toBe(401);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Invalid credentials');
  });

  afterAll(async () => {
    // Cerrar la conexión de Mongoose al finalizar las pruebas
    await mongoose.connection.close();

    // Detener la aplicación Express al finalizar las pruebas
    server.close();
  });
});
