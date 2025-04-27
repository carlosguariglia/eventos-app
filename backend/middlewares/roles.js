const db = require('../config/db');

export const esAdmin = (req, res, next) => {
    if (req.usuarioRol !== 'admin') {
        return res.status(403).json({ error: 'Acceso reservado a administradores' });
    }
    next();
};

export const esDueñoOAdmin = async (req, res, next) => {
    try {
        const [evento] = await db.query(
            'SELECT usuario_id FROM eventos WHERE id = ?', 
            [req.params.id]
        );

        if (!evento) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        if (evento.usuario_id !== req.usuarioId && req.usuarioRol !== 'admin') {
            return res.status(403).json({ 
                error: 'No eres el dueño de este evento ni administrador' 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    esAdmin,
    esDueñoOAdmin  // <-- Middleware nuevo integrado
};