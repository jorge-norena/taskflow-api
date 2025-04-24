const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // El token debe venir en formato: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o malformado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    req.userId = decoded.userId; // Guardamos el ID del usuario para usarlo después
    console.log('En userId', req.userId);
    next(); // pasa al siguiente middleware o al controlador
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
