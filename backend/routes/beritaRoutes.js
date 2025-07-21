import express from 'express';
import {
  getAllBerita,
  getBeritaById,
  createBerita,
  updateBerita,
  deleteBerita
} from '../controllers/beritaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
// ---- TAMBAHKAN IMPORT INI ----
import komentarRouter from './komentarRoutes.js';

const router = express.Router();

// ---- GUNAKAN ROUTER KOMENTAR DI SINI ----
// Mengalihkan request /:beritaId/komentar ke komentarRouter
router.use('/:beritaId/komentar', komentarRouter);


// Rute Publik
router.get('/', getAllBerita);
router.get('/:id', getBeritaById);

// Rute Khusus Admin
router.post('/', protect, admin, createBerita);
router.put('/:id', protect, admin, updateBerita);
router.delete('/:id', protect, admin, deleteBerita);

export default router;
