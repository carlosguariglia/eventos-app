const express = require('express');
const router = express.Router();
const { filtrarEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventos.controller');
const verificarToken = require('../middlewares/auth');
const { esDueñoOAdmin } = require('../middlewares/roles');

// Público
router.get('/', filtrarEventos);

// Protegidas
router.post('/', verificarToken, crearEvento);
router.put('/:id', verificarToken, esDueñoOAdmin, actualizarEvento);
router.delete('/:id', verificarToken, esDueñoOAdmin, eliminarEvento);


module.exports = router;