const express = require('express');
const { login, registro } = require('../controllers/auth.controller');

const router = express.Router();
router.post('/login', login);
router.post('/registro', registro);

module.exports = router;