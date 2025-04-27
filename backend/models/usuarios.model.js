import db from '../config/db.js';

export const obtenerUsuarioPorId = async (id) => {
  const [usuario] = await db.query('SELECT id, email, nombre, telefono, foto_url, bio FROM usuarios WHERE id = ?', [id]);
  return usuario;
};

export const actualizarUsuario = async (id, datos) => {
  const { nombre, telefono, foto_url, bio } = datos;
  await db.query(
    'UPDATE usuarios SET nombre = ?, telefono = ?, foto_url = ?, bio = ? WHERE id = ?',
    [nombre, telefono, foto_url, bio, id]
  );
};