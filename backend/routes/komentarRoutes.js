import express from 'express';
import {
  getKomentarByBeritaId,
  createKomentar
} from '../controllers/komentarController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

// Rute Publik untuk melihat komentar
router.get('/', getKomentarByBeritaId);

// Rute Private (butuh login) untuk membuat komentar
router.post('/', protect, createKomentar);

export default router;