const express = require('express');
require('dotenv').config();

// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
require('./v1/database/db');

const { swaggerOptions: swaggerOptionsv1 } = require('./v1/swagger');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de Mongoose para la conexión a MongoDB
// mongoose.connect('mongodb://localhost:27017/nombre_de_tu_base_de_datos');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rutas
const v1Routes = require('./v1/routes/tasksRoutes');

app.use('/api/v1', v1Routes);
app.use('/api/v1/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerOptionsv1));

// 404 sino coincide con ninguna ruta
app.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
