const express = require('express');
const { obtenerEventos } = require('../models/eventos.model');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const eventos = await obtenerEventos(req.query); // Filtros: ?tipo=recital&estado=activo
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;