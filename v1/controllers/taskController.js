const { validationResult } = require('express-validator');
const taskService = require('../services/taskServices');

const taskController = {

  // Controlador para obtener todas las tareas
  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks(); // Llama al servicio para obtener las tareas

      // Devolver las tareas como respuesta
      return res.status(200).json(tasks);
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error al obtener las tareas' });
    }
  },

  // Controlador para crear una nueva tarea
  async createTask(req, res) {
    const errors = validationResult(req);

    // Validación de errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, completed } = req.body;

    try {
      const taskData = { name, description, completed };
      const createdTask = await taskService.createTask(taskData);

      // Devolver la tarea creada como respuesta
      return res.status(201).json({ message: 'Tarea creada correctamente', createdTask });
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error al crear una nueva tarea' });
    }
  },

  // Controlador para obtener una tarea por su ID
  async getTaskById(req, res) {
    const errors = validationResult(req);

    // Validación de errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Uso del servicio
    try {
      const { id } = req.params;
      // Llama al servicio para obtener la tarea por ID
      const task = await taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      // Devolver la tarea como respuesta
      return res.status(200).json(task);
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error al obtener la tarea por ID' });
    }
  },

  // Controlador para actualizar una tarea por su ID
  async updateTaskById(req, res) {
    const errors = validationResult(req);

    // Validación de errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, description, completed } = req.body;

    // Verificar que al menos uno de los campos (name, description, completed)
    //    esté presente en la solicitud
    if (!name && !description && completed === undefined) {
      return res.status(400).json({ message: 'Se requiere al menos de name, description o completed para actualizar la tarea' });
    }

    const updatedTask = {};
    if (name) updatedTask.name = name;
    if (description) updatedTask.description = description;
    if (completed !== undefined) updatedTask.completed = completed;

    try {
      const updated = await taskService.updateTaskById(id, updatedTask);

      if (!updated) {
        return res.status(404).json({ message: 'Tarea no encontrada para actualizar' });
      }

      // Devolver la tarea actualizada como respuesta
      return res.status(200).json({ message: 'Tarea actualizada correctamente', updated });
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error al actualizar la tarea por ID' });
    }
  },

  // Controlador para eliminar una tarea por su ID
  async deleteTaskById(req, res) {
    const errors = validationResult(req);

    // Validación de errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const deletedTask = await taskService.deleteTaskById(id);

      if (!deletedTask) {
        return res.status(404).json({ message: 'Tarea no encontrada para eliminar' });
      }

      // Devolver la tarea eliminada como respuesta
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Error al eliminar la tarea por ID' });
    }
  },
};

module.exports = taskController;
