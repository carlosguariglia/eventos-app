// Controlador completo de eventos (crear, actualizar, filtrar)
const db = require('../config/db');

const crearEvento = async (req, res) => {
  // Código completo de creación (ya compartido)
};

const actualizarEvento = async (req, res) => {
  // Código completo de actualización (ya compartido)
};

const filtrarEventos = async (req, res) => {
  try {
    let query = 'SELECT * FROM eventos WHERE fecha BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY)';
    const params = [];

    if (req.query.tipo) {
      query += ' AND tipo_evento = ?';
      params.push(req.query.tipo);
    }
    if (req.query.estado) {
      query += ' AND estado = ?';
      params.push(req.query.estado);
    }

    const [eventos] = await db.query(query, params);
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearEvento, actualizarEvento, filtrarEventos };