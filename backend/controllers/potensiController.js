import db from '../config/database.js';

// @desc    Ambil semua data potensi nagari
// @route   GET /api/potensi
// @access  Public
export const getAllPotensi = async (req, res) => {
  try {
    const [potensi] = await db.query('SELECT * FROM potensi_nagari ORDER BY kategori, nama_potensi');
    res.json(potensi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Buat data potensi baru
// @route   POST /api/potensi
// @access  Private/Admin
export const createPotensi = async (req, res) => {
  const { nama_potensi, kategori, deskripsi, gambar_url } = req.body;

  if (!nama_potensi || !kategori || !deskripsi) {
    return res.status(400).json({ message: 'Nama, kategori, dan deskripsi wajib diisi' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO potensi_nagari (nama_potensi, kategori, deskripsi, gambar_url) VALUES (?, ?, ?, ?)',
      [nama_potensi, kategori, deskripsi, gambar_url]
    );
    res.status(201).json({ message: 'Data potensi berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update data potensi
// @route   PUT /api/potensi/:id
// @access  Private/Admin
export const updatePotensi = async (req, res) => {
  const { nama_potensi, kategori, deskripsi, gambar_url } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'UPDATE potensi_nagari SET nama_potensi = ?, kategori = ?, deskripsi = ?, gambar_url = ? WHERE id = ?',
      [nama_potensi, kategori, deskripsi, gambar_url, id]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Data potensi berhasil diperbarui' });
    } else {
      res.status(404).json({ message: 'Data potensi tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Hapus data potensi
// @route   DELETE /api/potensi/:id
// @access  Private/Admin
export const deletePotensi = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM potensi_nagari WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Data potensi berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Data potensi tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};