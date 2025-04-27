const db = require('../config/db');
const { generarToken } = require('../config/jwt');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generarToken(user);
    res.json({ token, rol: user.rol });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registro = async (req, res) => {
  try {
    const { email, password, nombre } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'INSERT INTO usuarios (email, password, nombre, rol) VALUES (?, ?, ?, "usuario")',
      [email, hashedPassword, nombre]
    );
    
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, registro };