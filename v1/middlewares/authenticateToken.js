const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY_JWT; // Clave secreta para firmar el token

function authenticateToken(req, res, next) {
  const token = req.headers.authorization; // Obtener el token de la cabecera authorization
  if (!token) {
    res.status(401).json({ message: 'Authentication token not provided' });
    return;
  }

  // Verificar y decodificar el token
  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    // Almacenar los datos del usuario decodificados en el objeto
    //  de solicitud para usarlos en las rutas protegidas
    // Al ser solo de tareas no utilizaremos esta data
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
