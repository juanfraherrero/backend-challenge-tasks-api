const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../../server'); // Tu aplicación Express
const Task = require('../models/Task');
const tasks = require('../database/dataToLoad.json');

let tasksSaved;
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
  });
  /// GET
  test('Devuelve status 200 para GET /api/tasks', async () => {
    const response = await request(server).get('/api/v1/tasks');
    expect(response.statusCode).toBe(200);

    // Verificar si la respuesta contiene la estructura esperada
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Devuelve status 200 para GET /api/tasks/:id', async () => {
    const response = await request(server).get(`/api/v1/tasks/${tasksSaved[0]._id}`);
    expect(response.statusCode).toBe(200);

    // Verificar si la respuesta contiene la estructura esperada
    expect(response.body).toBeDefined();
    expect(response.body.name).toBeDefined();
  });

  test('Devuelve status 404 para GET /api/tasks/:id', async () => {
    const response = await request(server).get('/api/v1/tasks/658cda922f06d5e81e545e01');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Tarea no encontrada');
  });

  test('Devuelve status 400 (error en id) para GET /api/tasks/:id', async () => {
    const response = await request(server).get('/api/v1/tasks/1e545e01');
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

  test('Devuelve status 404 para DELETE /api/tasks/:id', async () => {
    const response = await request(server).delete('/api/v1/tasks/658cda822f06d5f81e545e01');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Tarea no encontrada para eliminar');
  });

  test('Devuelve status 400 (error en id) para DELETE /api/tasks/:id', async () => {
    const response = await request(server).delete('/api/v1/tasks/658d018344e9748');
    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);

    const firstError = response.body.errors[0];
    expect(firstError.type).toBe('field');
    expect(firstError.path).toBe('id');
  });

  test.skip('Devuelve status 204 (No Content) para DELETE /api/tasks/:id', async () => {
    const response = await request(server).delete(`/api/v1/tasks/${tasksSaved[0]._id}`);
    expect(response.statusCode).toBe(204);
  }, 10000);

  /// PUT

  test('Devuelve status 200 para PUT /api/tasks/:id', async () => {
    const updatedData = {
      name: 'Nueva tarea',
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .put(`/api/v1/tasks/${tasksSaved[1]._id}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);

    expect(response.body.updated).toBeDefined();
    expect(response.body.updated.name).toBeDefined();
    expect(response.body.updated.name).toBe(updatedData.name);
    expect(response.body.updated.description).toBe(updatedData.description);
    expect(response.body.updated.completed).toBe(updatedData.completed);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Tarea actualizada correctamente');
  });

  test('Devuelve status 400 (error en id) para PUT /api/tasks/:id', async () => {
    const updatedData = {
      name: 'Nueva tarea',
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .put('/api/v1/tasks/658d018344e9748')
      .send(updatedData);

    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);

    const firstError = response.body.errors[0];
    expect(firstError.type).toBe('field');
    expect(firstError.path).toBe('id');
  });

  test('Devuelve status 400 (error en body) para PUT /api/tasks/:id', async () => {
    const response = await request(server)
      .put('/api/v1/tasks/658d8d494955e95f81091a5a')
      .send({});
    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Se requiere al menos de name, description o completed para actualizar la tarea');
  });

  test('Devuelve status 404 para PUT /api/tasks/:id', async () => {
    const response = await request(server).get('/api/v1/tasks/658cda922f06d5e81e545e01');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Tarea no encontrada');
  });

  /// POST

  test('Devuelve status 201 para POST /api/tasks', async () => {
    const newData = {
      name: 'Nueva tarea',
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .post('/api/v1/tasks')
      .send(newData);

    expect(response.statusCode).toBe(201);

    expect(response.body.createdTask).toBeDefined();
    expect(response.body.createdTask.name).toBeDefined();
    expect(response.body.createdTask.name).toBe(newData.name);
    expect(response.body.createdTask.description).toBe(newData.description);
    expect(response.body.createdTask.completed).toBe(newData.completed);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe('Tarea creada correctamente');
  });

  test('Devuelve status 400 (error en body) para POST /api/tasks', async () => {
    const newData = {
      description: 'Descripción actualizada',
      completed: true,
    };
    const response = await request(server)
      .post('/api/v1/tasks')
      .send(newData);

    expect(response.statusCode).toBe(400);

    // Verificar si la respuesta contiene la estructura de error esperada
    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);

    const firstError = response.body.errors[0];
    expect(firstError.type).toBe('field');
    expect(firstError.path).toBe('name');
  });

  afterAll(async () => {
    // Cerrar la conexión de Mongoose al finalizar las pruebas
    await mongoose.connection.close();

    // Detener la aplicación Express al finalizar las pruebas
    server.close();
  });
});