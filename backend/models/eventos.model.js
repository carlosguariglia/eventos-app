const db = require('../config/db');

const obtenerEventos = async (filtros = {}) => {
  let query = 'SELECT * FROM eventos WHERE 1=1';
  const params = [];

  // Filtros: tipo, estado, usuario_id, fecha
  if (filtros.tipo) {
    query += ' AND tipo_evento = ?';
    params.push(filtros.tipo);
  }
  if (filtros.estado) {
    query += ' AND estado = ?';
    params.push(filtros.estado);
  }
  // ... (agregar más filtros según necesites)

  const [eventos] = await db.query(query, params);
  return eventos;
};

module.exports = { obtenerEventos };