import jwt from 'jsonwebtoken';
import db from '../config/database.js';

// Middleware untuk melindungi rute (memastikan user sudah login)
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Dapatkan token dari header (Bentuknya: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Dapatkan data user dari DB (tanpa password) dan sisipkan ke object req
      const [users] = await db.query('SELECT id, nama, email, role FROM users WHERE id = ?', [decoded.id]);
      req.user = users[0];
      
      next(); // Lanjutkan ke controller selanjutnya
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

// Middleware untuk role admin
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Jika user adalah admin, lanjutkan
  } else {
    res.status(403).json({ message: 'Akses ditolak, hanya untuk admin' });
  }
};