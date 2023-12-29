const User = require('../models/User');

const userService = {

  // servicio para crear un nuevo usuario
  async existUser(username) {
    try {
      // Crea una nueva instancia del modelo User con los datos proporcionados
      const existingUser = await User.findOne({ username });

      return existingUser; // Devuelve la tarea creada
    } catch (error) {
      throw new Error('Errorverifying the new user:', error);
    }
  },

  // servicio para crear un nuevo usuario
  async createUser(username, password) {
    try {
      // Crea una nueva instancia del modelo User con los datos proporcionados
      const newUser = new User({ username, password });
      // Guarda el nuevo Ususario en la base de datos
      const createdUser = await newUser.save();
      return createdUser; // Devuelve la tarea creada
    } catch (error) {
      throw new Error('Error creating the new user:', error);
    }
  },

};

module.exports = userService;
