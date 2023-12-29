const mongoose = require('mongoose');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Otros campos que puedas necesitar
});

// Modelo de Usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
