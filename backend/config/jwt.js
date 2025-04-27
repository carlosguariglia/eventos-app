import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};