import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import eventosRoutes from './routes/eventos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (CORRECCIÓN CLAVE)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba de API
app.get('/api', (req, res) => {
  res.json({ message: 'API de Eventos Funcionando' });
});

// Catch-all para servir el frontend (CORRECCIÓN CLAVE)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`
  🚀 Servidor listo en:
  Frontend: http://localhost:${PORT}
  API: http://localhost:${PORT}/api
  `);
  console.log('✅ Ruta del frontend:', path.join(__dirname, '../frontend/public'));
});