require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// Rutas
const authRoutes = require('./routes/auth.routes');
const eventosRoutes = require('./routes/eventos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a DB
db.getConnection()
  .then(conn => {
    console.log('✅ Conectado a MariaDB');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión a MariaDB:', err);
  });

// Rutas
app.use('/auth', authRoutes);
app.use('/eventos', eventosRoutes);
app.use('/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Eventos Funcionando');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});