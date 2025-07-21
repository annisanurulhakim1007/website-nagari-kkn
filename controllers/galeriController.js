import db from '../config/database.js';

// @desc    Ambil semua item galeri
// @route   GET /api/galeri
// @access  Public
export const getAllGaleri = async (req, res) => {
  try {
    const [galeri] = await db.query('SELECT * FROM galeri ORDER BY tanggal_kegiatan DESC, created_at DESC');
    res.json(galeri);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Tambah item baru ke galeri
// @route   POST /api/galeri
// @access  Private/Admin
export const createGaleriItem = async (req, res) => {
  const { gambar_url, keterangan, tanggal_kegiatan } = req.body;

  if (!gambar_url) {
    return res.status(400).json({ message: 'URL Gambar wajib diisi' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO galeri (gambar_url, keterangan, tanggal_kegiatan) VALUES (?, ?, ?)',
      [gambar_url, keterangan, tanggal_kegiatan]
    );
    res.status(201).json({ message: 'Item galeri berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Hapus item dari galeri
// @route   DELETE /api/galeri/:id
// @access  Private/Admin
export const deleteGaleriItem = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM galeri WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Item galeri berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Item galeri tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
