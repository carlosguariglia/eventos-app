import db from '../config/db.js';  // Cambiado a import

export const filtrarEventos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const [eventos] = await db.query('SELECT * FROM eventos LIMIT ? OFFSET ?', [limit, offset]);
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearEvento = async (req, res) => {
    try {
        const { titulo, descripcion, fecha, ubicacion, tipo_evento } = req.body;
        if (!titulo || !fecha || !tipo_evento) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const [result] = await db.query(
            'INSERT INTO eventos (titulo, descripcion, fecha, ubicacion, tipo_evento, usuario_id) VALUES (?, ?, ?, ?, ?, ?)',
            [titulo, descripcion, fecha, ubicacion, tipo_evento, req.usuarioId]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, fecha, ubicacion, tipo_evento, estado } = req.body;
        
        const [evento] = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
        if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
        
        if (evento.usuario_id !== req.usuarioId && req.usuarioRol !== 'admin') {
            return res.status(403).json({ error: 'No autorizado' });
        }

        await db.query(
            'UPDATE eventos SET titulo = ?, descripcion = ?, fecha = ?, ubicacion = ?, tipo_evento = ?, estado = ? WHERE id = ?',
            [titulo, descripcion, fecha, ubicacion, tipo_evento, estado, id]
        );
        res.json({ mensaje: 'Evento actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarEvento = async (req, res) => {
    try {
        await db.query('DELETE FROM eventos WHERE id = ?', [req.params.id]);
        res.json({ mensaje: 'Evento eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
