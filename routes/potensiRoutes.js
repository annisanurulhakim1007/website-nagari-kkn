import express from 'express';
import {
  getAllPotensi,
  createPotensi,
  updatePotensi,
  deletePotensi
} from '../controllers/potensiController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllPotensi).post(protect, admin, createPotensi);
router.route('/:id').put(protect, admin, updatePotensi).delete(protect, admin, deletePotensi);

export default router;