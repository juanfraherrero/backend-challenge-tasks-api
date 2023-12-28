const mongoose = require('mongoose');
require('dotenv').config();

let connection;

const connect = () => {
  if (connection) return connection;

  const { MONGODB_URI } = process.env;

  // Conexión a la base de datos
  console.log('Conectando a la base de datos...');
  mongoose.connect(MONGODB_URI);

  connection = mongoose.connection;

  // Manejo de eventos de conexión
  connection.on('error', console.log.bind(console, 'Error de conexión a MongoDB:'));
  connection.once('open', () => {
    console.log('Conexión exitosa a la base de datos');
  });

  return connection;
};

module.exports = connect();
