const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');
const { actualizarPerfil } = require('../controllers/usuarios.controller');

router.put('/:id', verificarToken, actualizarPerfil);
module.exports = router;