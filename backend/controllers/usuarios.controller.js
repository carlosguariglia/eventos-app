import db from '../config/db.js';

export const actualizarPerfil = async (req, res) => {
    try {
        const { nombre, telefono, foto_url, bio } = req.body;
        await db.query(
            'UPDATE usuarios SET nombre = ?, telefono = ?, foto_url = ?, bio = ? WHERE id = ?',
            [nombre, telefono, foto_url, bio, req.params.id]
        );
        res.json({ mensaje: 'Perfil actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

