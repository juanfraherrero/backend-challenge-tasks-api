const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const db = require('./db');
const tasks = require('./dataToLoad.json');
const Task = require('../models/Task');

async function insertTasks() {
  try {
    await Task.deleteMany(); // Eliminar todos los documentos de la colección
    const tasksGuardadas = await Task.insertMany(tasks); // Guardar los datos en la colección
    console.log('Tasks saved:', tasksGuardadas);
  } catch (error) {
    console.error('Error al guardar las tareas:', error);
  } finally {
    // Cerrar la conexión una vez que hayas terminado
    mongoose.connection.close();
  }
}

insertTasks();
