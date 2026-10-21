import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carga las variables del archivo .env
dotenv.config();

// Verifica si el usuario tiene un token válido
const authMiddleware = (req, res, next) => {
  // Busca el token en los encabezados de la petición
  const authorization = req.headers.authorization;

  // Comprueba si el token fue enviado
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token no proporcionado'
    });
  }

  // Extrae el token del encabezado
  const token = authorization.split(' ')[1];

  try {
    // Verifica que el token sea válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guarda los datos del usuario en la petición
    req.user = decoded;

    // Permite continuar con la siguiente función
    next();
  } catch (error) {
    // Responde si el token es inválido o ha expirado
    return res.status(401).json({
      message: 'Token inválido o expirado'
    });
  }
};

// Exporta el middleware para utilizarlo en las rutas
export default authMiddleware;