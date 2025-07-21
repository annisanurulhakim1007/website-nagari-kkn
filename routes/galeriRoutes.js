import express from 'express';
import {
  getAllGaleri,
  createGaleriItem,
  deleteGaleriItem
} from '../controllers/galeriController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllGaleri).post(protect, admin, createGaleriItem);
router.route('/:id').delete(protect, admin, deleteGaleriItem);

export default router;
