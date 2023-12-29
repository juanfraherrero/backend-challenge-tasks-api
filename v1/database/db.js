const mongoose = require('mongoose');
require('dotenv').config();

let connection;

const connect = () => {
  // uso del patrón singleton para evitar que se abran múltiples conexiones
  if (connection) return connection;

  const { MONGODB_URI } = process.env;

  // Conexión a la base de datos
  console.log('Connecting to the database...');
  mongoose.connect(MONGODB_URI);

  connection = mongoose.connection;

  // Manejo de eventos de conexión
  connection.on('error', console.log.bind(console, 'Error de conexión a MongoDB:'));
  connection.once('open', () => {
    console.log('Connection succeded with the database');
  });

  return connection;
};

module.exports = connect();
