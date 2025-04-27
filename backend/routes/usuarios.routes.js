import { Router } from 'express';
import { actualizarPerfil } from '../controllers/usuarios.controller.js';
import { verificarToken } from '../middlewares/auth.js';

const router = Router();

router.put('/:id', verificarToken, actualizarPerfil);

export default router;