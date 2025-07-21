import express from 'express';
import {
  getAllAparat,
  createAparat,
  updateAparat,
  deleteAparat
} from '../controllers/aparatController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rute Publik
router.get('/', getAllAparat);

// Rute Khusus Admin
router.post('/', protect, admin, createAparat);
router.put('/:id', protect, admin, updateAparat);
router.delete('/:id', protect, admin, deleteAparat);

export default router;
