// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  let tokenSinBearer = token;

  // Verificamos si el token comienza con "Bearer "
  if (token.startsWith("Bearer ")) {
    // Extraemos la parte después de "Bearer "
    tokenSinBearer = token.slice(7);
  } else {
    console.log("El token no empieza con 'Bearer '");
  } 

  try {
    const decoded = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
module.exports = authMiddleware;