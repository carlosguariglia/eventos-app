import db from '../config/db.js';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const init = async () => {
  let conn;
  try {
    conn = await db.getConnection();
    await conn.query(`USE ${process.env.DB_NAME}`);

    console.log('✔ Tablas verificadas/creadas correctamente');
    
    // Crear admin si no existe
    const [admin] = await conn.query('SELECT * FROM usuarios WHERE email = ?', ['admin@example.com']);
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await conn.query(
        `INSERT INTO usuarios (email, password, nombre, rol) VALUES (?, ?, ?, 'admin')`,
        ['admin@example.com', hashedPassword, 'Administrador']
      );
      console.log('✔ Usuario admin creado');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (conn) conn.release();
    process.exit();
  }
};

init();