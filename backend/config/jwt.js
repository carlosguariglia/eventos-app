const jwt = require('jsonwebtoken');
const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};
module.exports = { generarToken };