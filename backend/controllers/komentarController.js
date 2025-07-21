import db from '../config/database.js';

// @desc    Ambil semua komentar untuk satu berita
// @route   GET /api/berita/:beritaId/komentar
// @access  Public
export const getKomentarByBeritaId = async (req, res) => {
  const { beritaId } = req.params;
  try {
    const [komentar] = await db.query(
      `SELECT k.id, k.isi_komentar, k.created_at, u.nama AS nama_user 
       FROM komentar k 
       JOIN users u ON k.id_user = u.id 
       WHERE k.id_berita = ? 
       ORDER BY k.created_at ASC`,
      [beritaId]
    );
    res.json(komentar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Buat komentar baru
// @route   POST /api/berita/:beritaId/komentar
// @access  Private
export const createKomentar = async (req, res) => {
  const { beritaId } = req.params;
  const { isi_komentar } = req.body;
  const id_user = req.user.id; // Didapat dari middleware 'protect'

  if (!isi_komentar) {
    return res.status(400).json({ message: 'Komentar tidak boleh kosong' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO komentar (isi_komentar, id_user, id_berita) VALUES (?, ?, ?)',
      [isi_komentar, id_user, beritaId]
    );
    res.status(201).json({ message: 'Komentar berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};