import db from '../config/db.js'; 

export const obtenerEventos = async (filtros = {}) => {
  let query = 'SELECT * FROM eventos WHERE fecha BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)';
  const params = [];

  
  if (filtros.tipo) {
    query += ' AND tipo_evento = ?';
    params.push(filtros.tipo);
  }
  if (filtros.estado) {
    query += ' AND estado = ?';
    params.push(filtros.estado);
  }
  if (filtros.usuario_id) {
    query += ' AND usuario_id = ?';
    params.push(filtros.usuario_id);
  }

  const [eventos] = await db.query(query, params);
  return eventos;
};

