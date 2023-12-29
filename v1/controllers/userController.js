const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');
require('dotenv').config();

const taskController = {

  // Controlador para registrar un usuario
  async register(req, res) {
    const errors = validationResult(req);

    // Validación de errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      // Verifica si ya existe un usuario con el mismo nombre de usuario
      const existingUser = await userServices.existUser(username);

      if (existingUser) {
        return res.status(400).json({ message: 'Username already in use' });
      }

      // Genera un hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10); // "10" es el número de rondas de hash

      // Crea un nuevo usuario con username y password
      const newUser = await userServices.createUser(username, hashedPassword);

      return res.status(201).json({ message: 'User succesfully registered', user: { username: newUser.username, _id: newUser._id } });
    } catch (error) {
      return res.status(500).json({ error: 'Error registering user' });
    }
  },

  // Controlador para logear un usuario
  async login(req, res) {
    const errors = validationResult(req);

    // Validación de errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Verifica si ya existe un usuario con el mismo nombre de usuario
      const user = await userServices.existUser(username);

      if (!user) {
        // devolvemos 401 para no indicar que el usuario no existe
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Comprueba si la contraseña proporcionada coincide con la almacenada (hasheada)
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Si las credenciales son válidas, generamos un token JWT
      const payload = {
        userId: user._id,
        username: user.username,
      };

      const secretKey = process.env.SECRET_KEY_JWT; // Clave secreta para firmar el token
      // 24hs porque al ser una API de tareas no es importante que expire tan rápido el token
      const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

      return res.status(200).json({ message: 'User successfully logged in', token });
    } catch (error) {
      return res.status(500).json({ error: 'Error loggin user' });
    }
  },
};

module.exports = taskController;
