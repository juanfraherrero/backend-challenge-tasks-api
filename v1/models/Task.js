const mongoose = require('mongoose');

// Definición del Schema para las Tareas
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }, // Excluímos el atributo __v
);

// Creación del modelo 'Task' basado en el Schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
