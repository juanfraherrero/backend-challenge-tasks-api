const Task = require('../models/Task');

const taskService = {

  // Controlador para obtener todas las tareas
  async getAllTasks(page, limit, sortQuery, completed) {
    const skip = (page - 1) * limit;
    try {
      let tasks;
      if (completed !== undefined) {
        tasks = await Task.find({ completed }).sort(sortQuery).skip(skip).limit(limit);
      } else {
        tasks = await Task.find().sort(sortQuery).skip(skip).limit(limit);
      }
      return tasks;
    } catch (error) {
      throw new Error('Error retriving tasks:', error);
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
      throw new Error('Error creating new task:', error);
    }
  },

  // Controlador para obtener una tarea por su ID
  async getTaskById(id) {
    try {
      const tasks = await Task.findById(id);
      return tasks;
    } catch (error) {
      throw new Error('Error retriving task:', error);
    }
  },

  // Controlador para actualizar una tarea por su ID
  async updateTaskById(id, updatedTask) {
    try {
      const updated = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
      return updated; // Devuelve la tarea actualizada
    } catch (error) {
      throw new Error('Error updating task by ID:', error);
    }
  },

  // Controlador para eliminar una tarea por su ID
  async deleteTaskById(id) {
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      return deletedTask; // Devuelve la tarea eliminada
    } catch (error) {
      throw new Error('Error deleting task by ID:', error);
    }
  },
};

module.exports = taskService;
