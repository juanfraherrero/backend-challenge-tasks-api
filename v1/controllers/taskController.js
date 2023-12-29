const { validationResult } = require('express-validator');
const taskService = require('../services/taskServices');

const taskController = {

  // Controlador para obtener todas las tareas
  async getAllTasks(req, res) {
    const errors = validationResult(req);

    // Validación de errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1, limit = 10, sortBy, sortDirection, completed,
    } = req.query;

    const sortQuery = {};

    if (sortBy && sortDirection) {
      sortQuery[sortBy] = sortDirection === 'desc' ? -1 : 1;
    } else if (sortBy || sortDirection) {
      // si cualquier de estos es proporcionado, pero no ambos entonces informamos el error
      return res.status(400).json({
        errors: [
          {
            type: 'fields',
            value: '81e545e00',
            msg: 'Se requiere de sortBy y sortDirection para ordenar las tareas',
            path: 'sortby, sortDirection',
            location: 'params',
          },
        ],
      });
    }

    try {
      // Llama al servicio para obtener las tareas
      const tasks = await taskService.getAllTasks(page, limit, sortQuery, completed);

      // Devolver las tareas como respuesta
      return res.status(200).json(tasks);
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error retrieving tasks' });
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
      return res.status(201).json({ message: 'Task created successfully', createdTask });
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error creating a new task' });
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
        return res.status(404).json({ message: 'Task not found' });
      }

      // Devolver la tarea como respuesta
      return res.status(200).json(task);
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error getting the task by ID' });
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
      return res.status(400).json({ message: 'At least name, description, or completed is required to update the task' });
    }

    const updatedTask = {};
    if (name) updatedTask.name = name;
    if (description) updatedTask.description = description;
    if (completed !== undefined) updatedTask.completed = completed;

    try {
      const updated = await taskService.updateTaskById(id, updatedTask);

      if (!updated) {
        return res.status(404).json({ message: 'Task not found to update' });
      }

      // Devolver la tarea actualizada como respuesta
      return res.status(200).json({ message: 'Task updated successfully', updated });
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: error.message || 'Error updating the task by ID' });
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
        return res.status(404).json({ message: 'Task not found to delete' });
      }

      // Devolver la tarea eliminada como respuesta
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Error deleting the task by ID' });
    }
  },
};

module.exports = taskController;
