const db = require('../config/db');
const limit = parseInt(req.query.limit) || 10;
const offset = parseInt(req.query.offset) || 0;
const [eventos] = await db.query('SELECT * FROM eventos LIMIT ? OFFSET ?', [limit, offset]);


const crearEvento = async (req, res) => {
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

const eliminarEvento = async (req, res) => {
    try {
        await db.query('DELETE FROM eventos WHERE id = ?', [req.params.id]);
        res.json({ mensaje: 'Evento eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ... (filtrarEventos y actualizarEvento permanecen igual que antes)
module.exports = { crearEvento, actualizarEvento, filtrarEventos, eliminarEvento };