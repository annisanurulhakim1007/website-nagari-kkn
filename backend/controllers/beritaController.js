import db from '../config/database.js';

// Fungsi bantuan untuk membuat slug dari judul
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

// @desc    Ambil semua berita
// @route   GET /api/berita
// @access  Public
export const getAllBerita = async (req, res) => {
  try {
    const [berita] = await db.query(
      'SELECT b.*, u.nama AS nama_penulis FROM berita b JOIN users u ON b.id_penulis = u.id ORDER BY b.created_at DESC'
    );
    res.json(berita);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Ambil satu berita berdasarkan ID atau Slug
// @route   GET /api/berita/:id
// @access  Public
export const getBeritaById = async (req, res) => {
  try {
    const [berita] = await db.query(
      'SELECT b.*, u.nama AS nama_penulis FROM berita b JOIN users u ON b.id_penulis = u.id WHERE b.id = ? OR b.slug = ?', 
      [req.params.id, req.params.id]
    );
    if (berita.length > 0) {
      res.json(berita[0]);
    } else {
      res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Buat berita baru
// @route   POST /api/berita
// @access  Private/Admin
export const createBerita = async (req, res) => {
  const { judul, konten, gambar_url } = req.body;
  const id_penulis = req.user.id; // Diambil dari middleware 'protect'
  const slug = createSlug(judul);

  try {
    const [result] = await db.query(
      'INSERT INTO berita (judul, slug, konten, gambar_url, id_penulis) VALUES (?, ?, ?, ?, ?)',
      [judul, slug, konten, gambar_url, id_penulis]
    );
    res.status(201).json({ message: 'Berita berhasil dibuat', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update berita
// @route   PUT /api/berita/:id
// @access  Private/Admin
export const updateBerita = async (req, res) => {
  const { judul, konten, gambar_url } = req.body;
  const slug = createSlug(judul);

  try {
    const [result] = await db.query(
      'UPDATE berita SET judul = ?, slug = ?, konten = ?, gambar_url = ? WHERE id = ?',
      [judul, slug, konten, gambar_url, req.params.id]
    );
    if (result.affectedRows > 0) {
      res.json({ message: 'Berita berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Hapus berita
// @route   DELETE /api/berita/:id
// @access  Private/Admin
export const deleteBerita = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM berita WHERE id = ?', [req.params.id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Berita berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
