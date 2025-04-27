const db = require('../config/db');

const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, telefono, foto_url, bio } = req.body;
    await db.query(
      'UPDATE usuarios SET nombre = ?, telefono = ?, foto_url = ?, bio = ? WHERE id = ?',
      [nombre, telefono, foto_url, bio, req.usuarioId]
    );
    res.json({ mensaje: 'Perfil actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { actualizarPerfil };