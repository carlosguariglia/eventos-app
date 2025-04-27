import mariadb from 'mariadb';
import { config } from 'dotenv';

config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// Test de conexión
pool.getConnection()
  .then(conn => {
    console.log(`✅ Conectado a MariaDB (${process.env.DB_NAME})`);
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
  });

export default pool; 