const Task = require('../models/Task');

const taskService = {

  // Controlador para obtener todas las tareas
  async getAllTasks() {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      throw new Error('Error al obtener las tareas:', error);
    }
  },

  // Controlador para crear una nueva tarea
  async createTask(taskData) {
    try {
      // Crea una nueva instancia del modelo Task con los datos proporcionados
      const newTask = new Task(taskData);
      // Guarda la nueva tarea en la base de datos
      const createdTask = await newTask.save();
      return createdTask; // Devuelve la tarea creada
    } catch (error) {
      throw new Error('Error al crear una nueva tarea:', error);
    }
  },

  // Controlador para obtener una tarea por su ID
  async getTaskById(id) {
    try {
      const tasks = await Task.findById(id);
      return tasks;
    } catch (error) {
      throw new Error('Error al obtener la tarea:', error);
    }
  },

  // Controlador para actualizar una tarea por su ID
  async updateTaskById(id, updatedTask) {
    try {
      const updated = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
      return updated; // Devuelve la tarea actualizada
    } catch (error) {
      throw new Error('Error al actualizar la tarea por ID:', error);
    }
  },

  // Controlador para eliminar una tarea por su ID
  async deleteTaskById(id) {
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      return deletedTask; // Devuelve la tarea eliminada
    } catch (error) {
      throw new Error('Error al eliminar la tarea por ID:', error);
    }
  },
};

module.exports = taskService;
