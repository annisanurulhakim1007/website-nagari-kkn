import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/database.js';

// Impor file-file rute
import authRoutes from './routes/authRoutes.js';
import beritaRoutes from './routes/beritaRoutes.js';
import aparatRoutes from './routes/aparatRoutes.js';
import potensiRoutes from './routes/potensiRoutes.js';
import galeriRoutes from './routes/galeriRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menggunakan Rute
app.use('/api/auth', authRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/aparat', aparatRoutes);
app.use('/api/potensi', potensiRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
