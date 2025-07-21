import express from 'express';
import {
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Semua rute di sini dilindungi dan hanya untuk admin
router.use(protect, admin);

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

export default router;