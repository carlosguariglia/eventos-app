import { Router } from 'express';
import { 
  filtrarEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../controllers/eventos.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { esDueñoOAdmin } from '../middlewares/roles.js';

const router = Router();

router.get('/', filtrarEventos);
router.post('/', verificarToken, crearEvento);
router.put('/:id', verificarToken, esDueñoOAdmin, actualizarEvento);
router.delete('/:id', verificarToken, esDueñoOAdmin, eliminarEvento);

export default router;