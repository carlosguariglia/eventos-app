// backend/scripts/initDB.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

const init = async () => {
  let conn;
  try {
    conn = await db.getConnection();
    console.log('Conexión a MariaDB establecida');

    // Crear tablas si no existen
    await conn.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nombre VARCHAR(100),
        telefono VARCHAR(20),
        foto_url TEXT,
        bio TEXT,
        rol ENUM('admin', 'usuario') DEFAULT 'usuario'
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS eventos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT,
        fecha DATETIME NOT NULL,
        ubicacion VARCHAR(255),
        tipo_evento ENUM('recital', 'presentacion', 'charla', 'lanzamiento', 'otros') NOT NULL,
        estado ENUM('activo', 'cancelado', 'terminado') DEFAULT 'activo',
        usuario_id INT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      )
    `);

    // Crear usuario admin si no existe
    const [admin] = await conn.query(
      'SELECT * FROM usuarios WHERE email = ?', 
      ['admin@example.com']
    );

    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await conn.query(
        `INSERT INTO usuarios 
        (email, password, nombre, rol) 
        VALUES (?, ?, ?, 'admin')`,
        ['admin@example.com', hashedPassword, 'Administrador']
      );
      console.log('✅ Usuario admin creado: admin@example.com / admin');
    } else {
      console.log('ℹ️ Usuario admin ya existe');
    }

    console.log('✅ Base de datos inicializada correctamente');

  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
  } finally {
    if (conn) conn.release(); // Liberar conexión
    process.exit(); // Finalizar proceso
  }
};

// Ejecutar inicialización
init();