const esAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    next();
  };
  
  module.exports = { esAdmin };